using TypeGen.Core.TypeAnnotations;

namespace Transit.Server.Models.Authentication.RequestModels;

[ExportTsInterface]
public class LoginRequestModel
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}