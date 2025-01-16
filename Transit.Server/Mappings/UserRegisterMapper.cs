using FastEndpoints;
using Transit.Server.Database.Entity;
using Transit.Server.Models.Authentication.RequestModels;
using Transit.Server.Models.Authentication.ResponseModels;

namespace Transit.Server.Mappings;

public class UserRegisterMapper : Mapper<RegisterRequestModel, RegisterResponseModel, UserEntity>
{
    public override UserEntity ToEntity(RegisterRequestModel r)
    {
        return new UserEntity
        {
            Email = r.Email,
            UserName = r.Username,
            FirstName = r.FirstName,
            LastName = r.LastName
        };
    }

    public override RegisterResponseModel FromEntity(UserEntity e)
    {
        return new RegisterResponseModel
        {
            Email = e.Email!
        };
    }
}