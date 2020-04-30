using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public class DatingRespository : IDatingRepository
    {
        private readonly DatingAppDbContext _context;

        //private readonly 
        public DatingRespository(DatingAppDbContext context)
        {
            _context = context;
        }
        void IDatingRepository.Add<T>(T entity)
        {
            _context.Add(entity);
        }

        void IDatingRepository.Delete<T>(T entity)
        {
            _context.Remove(entity);
        }

       async  Task<User> IDatingRepository.GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

       async  Task<IEnumerable<User>> IDatingRepository.GetUsers( )
        {
            var users =await  _context.Users.Include(p => p.Photos).ToListAsync();
            return users;
        }

      async   Task<bool> IDatingRepository.SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
