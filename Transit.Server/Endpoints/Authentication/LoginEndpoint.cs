using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Transit.Server.Database.Entity;
using Transit.Server.Mappings;
using Transit.Server.Models.Authentication.RequestModels;
using Transit.Server.Models.Authentication.ResponseModels;

namespace Transit.Server.Endpoints.Authentication;

public class LoginEndpoint : Ep.Req<LoginRequestModel>.Res<LoginResponseModel>.Map<UserLoginMapper>
{
    private readonly UserManager<UserEntity> _userManager;
    private readonly IConfiguration _configuration;

    public LoginEndpoint(UserManager<UserEntity> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    public override void Configure()
    {
        Post("login");
        Group<AuthenticationGroup>();
        AllowAnonymous();
    }

    public override async Task<LoginResponseModel> ExecuteAsync(LoginRequestModel req, CancellationToken ct)
    {
        var userEntity = await _userManager.FindByEmailAsync(req.Email);
        const string invalidEmailOrPasswordText = "Invalid email or password";
        if (userEntity == null)
        {
            ThrowError(invalidEmailOrPasswordText);
        }
        
        var result = await _userManager.CheckPasswordAsync(userEntity, req.Password);
        if (!result)
        {
            ThrowError(invalidEmailOrPasswordText);
        }
        
        var roles = await _userManager.GetRolesAsync(userEntity);

        List<Claim> claims =
        [
            new(ClaimTypes.Name, userEntity.UserName),
            new(ClaimTypes.Email, userEntity.Email),
            new(ClaimTypes.NameIdentifier, userEntity.Id.ToString())
        ];
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
        
        var token = GetToken(claims);
        var refreshToken = GenerateRefreshToken();
        userEntity.RefreshToken = refreshToken;
        userEntity.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(_configuration.GetValue<int>("JWT:RefreshTokenExpiryInDays"));
        await _userManager.UpdateAsync(userEntity);

        var writeToken = new JwtSecurityTokenHandler().WriteToken(token);
        return new LoginResponseModel
        {
            Token = writeToken,
            Expires = token.ValidTo,
            RefreshToken = refreshToken,
            Username = userEntity.UserName,
            Email = userEntity.Email,
            FirstName = userEntity.FirstName,
            LastName = userEntity.LastName
        };
    }
    
    private JwtSecurityToken GetToken(List<Claim> authClaims)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );
        return token;
    }
    
    private static string GenerateRefreshToken()
    {
        var randomNumber = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }
}