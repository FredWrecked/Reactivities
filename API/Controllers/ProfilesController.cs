using Application.Profiles;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController: BaseApiController
{
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile(string username)
    {
        return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
    }
    
    [HttpPut]
    public async Task<IActionResult> EditProfile(AppUser user)
    {
        return HandleResult(await Mediator.Send(new Edit.Command { AppUser = user }));
    }
}