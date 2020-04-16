using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DatingAppDbContext _context;

        public AuthRepository(DatingAppDbContext context)
        {
            _context = context;
        }

        public async Task<User> Login(UserForRegisterDto userData)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userData.UserName);
            if (user == null)
            {
                return null;
            }
            if (!VerifyPasswordHash(user.PasswordHash, userData.Password))
            {
                return null;
            }
            return user;
        }

        private bool VerifyPasswordHash(byte[] passwordHash, string password)
        {
            byte[] ComputedHash;
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                ComputedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            for (int i = 0; i < ComputedHash.Length; i++)
            {
                if (ComputedHash[i] != passwordHash[i])
                {
                    return false;
                }
            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] PasswordHash, PasswordSalt;
            PasswordHashGenerator(password, out PasswordHash, out PasswordSalt);
            user.PasswordHash = PasswordHash;
            user.PasswordSalt = PasswordSalt;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private void PasswordHashGenerator(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExist(string username)
        {
            if (await _context.Users.AnyAsync(_user => _user.UserName.ToLower() == username.ToLower()))
            {
                return true;
            }
            return false;
        }
    }
}
