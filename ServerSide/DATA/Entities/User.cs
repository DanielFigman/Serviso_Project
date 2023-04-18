using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Xml.Linq;

namespace DATA
{
    public partial class User
    {
        private readonly hotelAppDBContext db = new hotelAppDBContext();

        private HelperFunctions dataHelper = new HelperFunctions();

        public bool CheckUsersPassword(string givenPassword)
        {
            try
            {
                byte[] storedHashedPassword = PasswordValue,
                       storedSalt = SaltValue;

                string userInputPassword = givenPassword;
                var hashedUserInputPassword = new Rfc2898DeriveBytes(userInputPassword, storedSalt, 10000).GetBytes(20);

                return hashedUserInputPassword.SequenceEqual(storedHashedPassword);
            }
            catch (Exception)
            {
                return false;
            }
        }


        public bool CreateUser(JObject data)
        {


            Dictionary<string, Object> convertedDict = dataHelper.ConvertJsonToDictionary(data);

            if (convertedDict.ContainsKey("email"))
            {
                if (IsUserExist(convertedDict["email"].ToString()))
                {
                    throw new UserExistsException(convertedDict["email"].ToString());
                }
            }
            else
            {
                throw new MissingFieldException("Email address must be sent for user creation");
            }

            User u = dataHelper.CreateObjectFromDictionary<User>(convertedDict);

            email = u.email;
            PasswordValue = u.PasswordValue;
            SaltValue = u.SaltValue;
            languageID = u.languageID;
            dateOfBirth = u.dateOfBirth;
            phone = u.phone;
            gender = u.gender;
            fName = u.fName;
            sName = u.sName;


            db.Users.Add(this);
            try
            {
                db.SaveChanges();
            }
            catch (Exception)
            {
                throw new MissingFieldException();
            }

            return true;



        }

        public bool IsUserExist(string email)
        {
            return db.Users.SingleOrDefault(u => u.email == email) != null;
        }

        public async Task<string> SendCodeToUser()
        {
            string code = dataHelper.GetVerificationCode();
            bool isEnglish = Language.shortName == "EN";
            string name = fName;


            bool isEmailSent = await dataHelper.SendVerificationCodeEmail(email, name, code, isEnglish);
            if (isEmailSent)
            {
                return code;
            }

            return null;
        }

        public void PasswordUpdate(string givenPassword)
        {
            dataHelper.EncryptPassword(this, givenPassword);
        }

        public String GetHotelLocation()
        {
            DateTime oneWeekAgo = DateTime.Now.AddDays(-7);
            DateTime tommorow = DateTime.Now.AddDays(1);

            Order currentOrder = Guest.Orders
                .Where(order => order.checkInDate >= oneWeekAgo && order.checkOutDate >= tommorow)
                .OrderBy(order => order.checkInDate)
                .ThenBy(order => order.checkOutDate)
                .FirstOrDefault();

            return currentOrder?.Hotel?.landmark;
        }
    }
}