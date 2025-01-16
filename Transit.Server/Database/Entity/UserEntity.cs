using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Transit.Server.Abstractions.Database.Entity;

namespace Transit.Server.Database.Entity;

public class UserEntity : IdentityUser<int>, IEntity
{
    public override int Id { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    [MaxLength(50)]
    public string? FirstName { get; set; }
    [MaxLength(50)]
    public string? LastName { get; set; }

    [MaxLength(1024)]
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }
}

public class RoleEntity : IdentityRole<int>, IEntity
{
    public override int Id { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}