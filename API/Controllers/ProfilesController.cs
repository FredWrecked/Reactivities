using Application.Activities;
using Application.Profiles;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Details = Application.Profiles.Details;
using Edit = Application.Profiles.Edit;

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
    
    [HttpGet("{username}/activities")]
    public async Task<IActionResult> GetUserActivities(string username, [FromQuery]string predicate)
    {
        return HandleResult(await Mediator.Send(new ListUserActivities.Query
        {
            Predicate = predicate,
            Username = username
        }));
    }

}