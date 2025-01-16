namespace Transit.Server.Abstractions.Database.Entity;

public interface IEntity
{
    int Id { get; set; }
    bool IsDeleted { get; set; }
    DateTime CreatedAt { get; set; }
    DateTime UpdatedAt { get; set; }
}