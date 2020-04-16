using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [StringLength(8,MinimumLength =4,ErrorMessage = "Password length must be at least 4 characters and 8 at most.")]
        public string Password { get; set; }
        public string Email { get; set; }

    }
    public class UserForLoginDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
