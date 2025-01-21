using TypeGen.Core.TypeAnnotations;

namespace Transit.Server.Models.General;

[ExportTsInterface]
public class BadRequestResponseModel
{
    public required string[] Errors { get; set; }
    public required string Message { get; set; }
}