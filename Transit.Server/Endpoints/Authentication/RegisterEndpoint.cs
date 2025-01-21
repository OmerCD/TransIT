using FastEndpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Transit.Server.Constants;
using Transit.Server.Database.Entity;
using Transit.Server.Mappings;
using Transit.Server.Models.Authentication.RequestModels;
using Transit.Server.Models.Authentication.ResponseModels;

namespace Transit.Server.Endpoints.Authentication;

public class RegisterEndpoint : Ep.Req<RegisterRequestModel>.Res<RegisterResponseModel>.Map<UserRegisterMapper>
{
    private readonly UserManager<UserEntity> _userManager;
    private readonly RoleManager<RoleEntity> _roleManager;
    public RegisterEndpoint(UserManager<UserEntity> userManager, RoleManager<RoleEntity> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public override void Configure()
    {
        Post("/register");
        AllowAnonymous();
        Group<AuthenticationGroup>();
    }

    public override async Task<RegisterResponseModel> ExecuteAsync(RegisterRequestModel req, CancellationToken ct)
    {
        var user = Map.ToEntity(req);
        var result = await _userManager.CreateAsync(user, req.Password);
        if (!result.Succeeded)
        {
            ThrowError(r => r.Username, result.Errors.First().Description);
        }
        
        var userRole = await _roleManager.Roles.SingleAsync(x=>x.Name == UserRoles.User, cancellationToken: ct);
        await _userManager.AddToRoleAsync(user, userRole.Name);
        
        return Map.FromEntity(user);
    }
}