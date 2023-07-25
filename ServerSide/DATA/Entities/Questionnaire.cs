using DATA.Exceptions;
using Nest;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;


namespace DATA
{
    public partial class Questionnaire
    {
        private readonly hotelAppDBContextNew db = new hotelAppDBContextNew();

        private readonly HelperFunctions dataHelper = new HelperFunctions();


        public List<ActivityNearByDTO> GetSuggestedActivities(string email, List<int> ids)
        {
            Questionnaire userQuestionnaire = db.Questionnaires.Where(q => q.User.email == email).FirstOrDefault();

            List<ActivityNearByDTO> suggestedActivities = new List<ActivityNearByDTO>();

            if (userQuestionnaire != null)
            {
                List<User> similarUsers = GetTopSimlarUsers(userQuestionnaire, ids);
                suggestedActivities = GetRelatedActivities(similarUsers, ids);
            }

            return suggestedActivities;
        }

        private List<ActivityNearByDTO> GetRelatedActivities(List<User> similarUsers, List<int> ids)
        {
            double ratingWeight = 0.7;
            double favWeight = 0.3;

            Dictionary<int, double> activitiesScore = new Dictionary<int, double>();

            List<ActivityNearByDTO> retVal = new List<ActivityNearByDTO>();

            similarUsers.ForEach(simUser =>
            {
                List<Activity_Update> activity_Updates = simUser.Activity_Update.Where(a => ids.Contains(a.placeID)).ToList();

                activity_Updates.ForEach(a =>
                {
                    if (a.favorite == true || a.rating != null)
                    {
                        if (!activitiesScore.ContainsKey(a.placeID))
                        {
                            activitiesScore[a.placeID] = 0;
                        }

                        if (a.rating != null)
                        {
                            activitiesScore[a.placeID] += (int)a.rating * ratingWeight;
                        }

                        if (a.favorite == true)
                        {
                            activitiesScore[a.placeID] += favWeight;
                        }

                    }
                });

            });

            List<int> top5PlaceIDs = activitiesScore.OrderByDescending(kv => kv.Value)
                                .Take(5)
                                .Select(kv => kv.Key)
                                .ToList();

            List <Activity_nearBY> activitiesToSuggest = db.Activity_nearBY.Where(obj => top5PlaceIDs.Contains(obj.placeID)).ToList();

            activitiesToSuggest.ForEach(obj =>
            {
                ActivityNearByDTO actToAdd = new ActivityNearByDTO();
                actToAdd.SetActivityNearByDTO(obj);
                retVal.Add(actToAdd);
            });

            return retVal;
        }

        private double ComputeCosineSimilarity(Questionnaire a, Questionnaire b)
        {
            double dotProduct = 0;
            double normA = 0;
            double normB = 0;

            foreach (PropertyInfo prop in typeof(Questionnaire).GetProperties())
            {
                if (prop.PropertyType == typeof(int?) && prop.Name != "questionnaireID")
                {
                    int? valA = (int?)prop.GetValue(a);
                    int? valB = (int?)prop.GetValue(b);

                    if (valA.HasValue && valB.HasValue)
                    {
                        dotProduct += valA.Value * valB.Value;
                        normA += valA.Value * valA.Value;
                        normB += valB.Value * valB.Value;
                    }
                }
            }

            double similarity = 0;
            if (normA != 0 && normB != 0)
            {
                similarity = dotProduct / (Math.Sqrt(normA) * Math.Sqrt(normB));
            }

            return similarity;
        }


        private List<User> GetTopSimlarUsers(Questionnaire userQuestionnaire, List<int> ids)
        {
            string email = userQuestionnaire.User.email;

            List<User> allUsers = db.Users
                .GroupJoin(db.Questionnaires,
                    u => u.email,
                    q => q.User.email,
                    (u, q) => new { User = u, Questionnaires = q })
                .SelectMany(
                    uq => uq.Questionnaires.DefaultIfEmpty(),
                    (u, q) => new { User = u.User, Questionnaire = q })
                .Where(uq => uq.User.email != email && uq.Questionnaire != null)
                .Select(uq => uq.User)
                .ToList();

            List<User> allRelatedUsers = allUsers.Where(obj =>
                db.Activity_Update.FirstOrDefault(x => x.email == obj.email && ids.Contains(x.placeID) && (x.favorite == true || x.rating != null)) != null
                ).ToList();

            // Computing the similarities between the user's questionnaire and all other users questionnaires
            List<Tuple<User, double>> similarities = new List<Tuple<User, double>>();

            foreach (User u in allRelatedUsers)
            {
                Questionnaire otherQuestionnaire = db.Questionnaires.Where(q => q.User.email == u.email).FirstOrDefault();
                double similarity = ComputeCosineSimilarity(userQuestionnaire, otherQuestionnaire);
                similarities.Add(new Tuple<User, double>(u, similarity));
            }

            // Sorting the similarities in desc order and take the top N similar users
            int N = 5;
            List<Tuple<User, double>> topSimilarities = similarities.OrderByDescending(t => t.Item2).Take(N).ToList();

            List<User> topUsers = topSimilarities.Select(t => t.Item1).ToList();

            return topUsers;
        }

        public void CreateQuestionnaire(JObject questionnaire)
        {
            Dictionary<string, Object> convertedDict = dataHelper.ConvertJsonToDictionary(questionnaire);

            if (convertedDict.ContainsKey("email"))
            {
                string userEmail = convertedDict["email"].ToString();

                User user = db.Users.FirstOrDefault(u => u.email == userEmail);

                if (user != null)
                {
                    Questionnaire userQuestionnaire = db.Questionnaires.FirstOrDefault(obj => obj.User.email == userEmail);

                    SetQuestionnaireID(userQuestionnaire, ref convertedDict);

                    //creating an instance of questionnaire based on the Json properties
                    Questionnaire newQuestionnaire = dataHelper.CreateObjectFromDictionary<Questionnaire>(convertedDict);

                    //link the user to the newQuestionnaire
                    newQuestionnaire.User = user;

                    //setting the instnce object values to this 
                    dataHelper.SetObjectValuesFromObject(this, newQuestionnaire);

                    try
                    {
                        db.Questionnaires.AddOrUpdate(this);
                        db.SaveChanges();
                    }
                    catch (Exception)
                    {
                        throw new MissingFieldException();
                    }
                }
                else
                {
                    throw new NonExistingUser(userEmail);
                }
            }
            else
            {
                throw new InvalidJsonSchemaException("the json schema must contain the user email");
            }


        }

        private void SetQuestionnaireID(Questionnaire userQuestionnaire, ref Dictionary<string, Object> convertedDict)
        {
            if (userQuestionnaire != null)
            {
                convertedDict["questionnaireID"] = userQuestionnaire.questionnaireID;
            }
            else
            {
                int newQuestionnaireID = db.Questionnaires.Count() + 1;

                while (db.Questionnaires.FirstOrDefault(q => q.questionnaireID == newQuestionnaireID) != null)
                {
                    newQuestionnaireID += 1;
                }

                convertedDict["questionnaireID"] = newQuestionnaireID;
            }
        }
    }
}
