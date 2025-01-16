using TypeGen.Core.TypeAnnotations;

namespace Transit.Server.Models.Authentication.ResponseModels;

[ExportTsInterface]
public class LoginResponseModel
{
    public required string Token { get; set; }
    public required string RefreshToken { get; set; }
    public required DateTime Expires { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
}