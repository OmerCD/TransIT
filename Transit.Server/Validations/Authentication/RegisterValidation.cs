using FastEndpoints;
using FluentValidation;
using Transit.Server.Models.Authentication.RequestModels;

namespace Transit.Server.Validations.Authentication;

public class RegisterValidation : Validator<RegisterRequestModel>
{
    public RegisterValidation()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Username).NotEmpty().MinimumLength(3).MaximumLength(50);
        RuleFor(x => x.FirstName).NotEmpty().MinimumLength(3).MaximumLength(50);
        RuleFor(x => x.LastName).NotEmpty().MinimumLength(3).MaximumLength(50);
        RuleFor(x => x.Password).NotEmpty().MinimumLength(3);
        RuleFor(x => x.ConfirmPassword).Equal(x => x.Password);
    }
}