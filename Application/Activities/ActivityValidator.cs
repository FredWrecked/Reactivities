using Domain;
using FluentValidation;

namespace Application.Activities;

public class ActivityValidator: AbstractValidator<Activity>
{
    public ActivityValidator()
    {
        RuleFor(it => it.Title).NotEmpty();
        RuleFor(it => it.Description).NotEmpty();
        RuleFor(it => it.Date).NotEmpty();
        RuleFor(it => it.Category).NotEmpty();
        RuleFor(it => it.City).NotEmpty();
        RuleFor(it => it.Venue).NotEmpty();
    }
}