using Application.Activities;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class ListUserActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public string Predicate { get; set; }
        public string Username { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {

            var userActivities = new List<UserActivityDto>();
            
            switch (request.Predicate)
            {
                case "past":
                    userActivities = await _context.ActivityAttendees
                        .Where(it =>
                            it.AppUser.UserName == request.Username &&
                            it.Activity.Date <= DateTime.UtcNow
                            )
                        .OrderBy(a => a.Activity.Date)
                        .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                        .ToListAsync();
                    break;
                case "future":
                    userActivities = await _context.ActivityAttendees
                        .Where(it =>
                            it.AppUser.UserName == request.Username &&
                            it.Activity.Date >= DateTime.UtcNow
                        )
                        .OrderBy(a => a.Activity.Date)
                        .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                        .ToListAsync();
                     break;
                case "hosting":
                    userActivities = await _context.ActivityAttendees
                        .Where(it =>
                            it.Activity.Attendees.First(a => a.IsHost).AppUser.UserName == request.Username 
                            && it.IsHost
                        )
                        .OrderBy(a => a.Activity.Date)
                        .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                        .ToListAsync();
                    break;
            }

            return Result<List<UserActivityDto>>.Success(userActivities);
        }
    }
}