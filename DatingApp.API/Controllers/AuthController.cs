using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userObj)
        {
            if(await _repo.UserExist(userObj.UserName))
            {
                return BadRequest("This user is already existed");
            }
            var NewUser = new User
            {
                UserName = userObj.UserName,
            Email = userObj.Email
            };
            await _repo.Register(NewUser, userObj.Password);
            return StatusCode(201);
        }
        public async Task<IActionResult> Get()
        {
            var result = "hello";
            return Ok(result);
        }
    }
}
