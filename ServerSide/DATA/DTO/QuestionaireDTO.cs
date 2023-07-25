using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA
{
    public class QuestionaireDTO
    {
        public int? adventure_sports { get; set; }
        public int? nature { get; set; }
        public int? culture { get; set; }
        public int? concerts { get; set; }
        public int? nightlife { get; set; }
        public int? art { get; set; }
        public int? personal_development { get; set; }
        public int? sports { get; set; }
        public int? tours { get; set; }
        public int? shopping { get; set; }
        public int? workshops { get; set; }

        public void SetQuestionaireDTO(Questionnaire questionnaire)
        {
            adventure_sports = questionnaire.adventure_sports;
            nature = questionnaire.nature;
            culture = questionnaire.culture;
            concerts = questionnaire.concerts;
            nightlife = questionnaire.nightlife;
            art = questionnaire.art;
            personal_development = questionnaire.personal_development;
            sports = questionnaire.sports;
            tours = questionnaire.tours;
            shopping = questionnaire.shopping;
            workshops = questionnaire.workshops;
        }
    }
}
