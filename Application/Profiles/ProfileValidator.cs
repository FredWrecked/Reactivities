using Domain;
using FluentValidation;

namespace Application.Profiles;

public class ProfileValidator: AbstractValidator<AppUser>
{
    public ProfileValidator()
    {
        RuleFor(it => it.DisplayName).NotEmpty();
    }
}