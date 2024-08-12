﻿using Application.Activities;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet] //api/activities
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //api/activities/{id}
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }
        
        [HttpPost] //api/activities
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }
        
        [HttpPut("{id}")] //api/activities
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }
        
        [HttpDelete("{id}")] //api/activities
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}

