﻿using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class Edit
{
    public class Command : IRequest<Result<Unit>>
    {
        public AppUser AppUser { get; set; }
    }
    
    public class CommandValidator: AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(it => it.AppUser).SetValidator(new ProfileValidator());
        }
    }
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(it => it.UserName == _userAccessor.GetUsername());
            
            if (user == null) return null;

            user.Bio = request.AppUser.Bio;
            user.DisplayName = request.AppUser.DisplayName;
            
            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Unit>.Failure("Failed to update user profile");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}