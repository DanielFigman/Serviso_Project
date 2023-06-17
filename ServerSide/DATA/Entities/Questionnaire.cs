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


        public SuggestedActivities GetSuggestedActivities(string email)
        {
            Questionnaire userQuestionnaire = db.Questionnaires.Where(q => q.User.email == email).FirstOrDefault();

            SuggestedActivities SuggestedActivities = new SuggestedActivities();

            if (userQuestionnaire != null)
            {
                List<User> similarUser = GetTopSimlarUsers(userQuestionnaire);
            }



            return SuggestedActivities;
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


        private List<User> GetTopSimlarUsers(Questionnaire userQuestionnaire)
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

            // Computing the similarities between the user's questionnaire and all other users questionnaires
            List<Tuple<User, double>> similarities = new List<Tuple<User, double>>();

            foreach (User u in allUsers)
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
