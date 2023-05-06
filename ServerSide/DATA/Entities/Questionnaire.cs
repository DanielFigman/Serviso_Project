using System;
using System.Collections.Generic;
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
    }
}
