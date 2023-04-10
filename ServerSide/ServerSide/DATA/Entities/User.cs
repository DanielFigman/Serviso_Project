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
            catch (Exception)
            {
                return false;
            }

            
           

        }

        public bool IsUserExist(string email)
        {
            return db.Users.SingleOrDefault(u => u.email == email) != null;
        }
    }
}