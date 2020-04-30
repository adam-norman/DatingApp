using DatingApp.API.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DatingAppDbContext _context;
        public Seed(DatingAppDbContext context)
        {
            _context = context;
        }
        public void SeedUsers()
        {
            var UserData = System.IO.File.ReadAllText("Data/userSeed.json");
            var Users = JsonConvert.DeserializeObject<List<User>>(UserData);
            foreach (var user in Users)
            {
                byte[] PasswordHash, PasswordSalt;
                PasswordHashGenerator("password", out PasswordHash, out PasswordSalt);
                user.PasswordHash = PasswordHash;
                user.PasswordSalt = PasswordSalt;
                user.UserName = user.UserName.ToLower();
                _context.Users.Add(user);
            }
            _context.SaveChanges();
        }
        private void PasswordHashGenerator(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
