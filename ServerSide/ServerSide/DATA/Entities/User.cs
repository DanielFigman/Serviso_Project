using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;


namespace DATA
{
    public partial class User
    {

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


        public bool UpdateUserInfo(string givenEmail, string givenPassword, string givenLanguage, DateTime birthDate, string givenPhoneNumber)
        {
            try
            {

                byte[] salt = new byte[16];
                new RNGCryptoServiceProvider().GetBytes(salt);

                var hashedPassword = new Rfc2898DeriveBytes(givenPassword, salt, 10000).GetBytes(20);

                PasswordValue = hashedPassword;
                SaltValue = salt;
                language = givenLanguage;
                dateOfBirth = birthDate;
                phone = givenPhoneNumber;

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
         
        }

    }
}