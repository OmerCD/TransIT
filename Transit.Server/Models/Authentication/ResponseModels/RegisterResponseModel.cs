using TypeGen.Core.TypeAnnotations;

namespace Transit.Server.Models.Authentication.ResponseModels;

[ExportTsInterface]
public class RegisterResponseModel
{
    public required string Email { get; set; }
}