using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.IO;
using Newtonsoft.Json.Linq;

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
            catch (Exception e)
            {
                return false;
            }
        }


        public bool CreateUser(JObject data, out string errorMessage)
        {
            try
            {
                errorMessage = string.Empty;

                Dictionary<string, Object> convertedDict = dataHelper.ConvertJsonToDictionary(data);

                if (isUserExist(convertedDict["email"].ToString()))
                {
                    errorMessage = $"{convertedDict["email"]} is already exist in the system";
                    return false;
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

                    throw new Exception ("one of the required fields of the user has not been sent");
                }

                return true;
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
                return false;
            }

        }

        public bool isUserExist(string email)
        {
            return db.Users.SingleOrDefault(u => u.email == email) != null;
        }
    }
}