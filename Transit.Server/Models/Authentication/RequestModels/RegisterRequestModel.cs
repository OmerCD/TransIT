﻿using TypeGen.Core.TypeAnnotations;

namespace Transit.Server.Models.Authentication.RequestModels;

[ExportTsInterface]
public class RegisterRequestModel
{
    public required string Email { get; set; }
    public required string Username { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Password { get; set; }
    public required string ConfirmPassword { get; set; }
}