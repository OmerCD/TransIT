using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Transit.Server.Abstractions.Database.Entity;
using Transit.Server.Database.Entity;

namespace Transit.Server.Database;

public class TransitDbContext : IdentityDbContext<UserEntity, RoleEntity, int>
{
    public TransitDbContext(DbContextOptions<TransitDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        var now = new DateTime(2000,01,01).ToUniversalTime();
        builder.Entity<RoleEntity>().HasData(
            new RoleEntity { Id = 1, Name = Constants.UserRoles.Admin, CreatedAt = now, UpdatedAt = now, NormalizedName = Constants.UserRoles.Admin.ToUpper() },
            new RoleEntity { Id = 2, Name = Constants.UserRoles.User, CreatedAt = now, UpdatedAt = now, NormalizedName = Constants.UserRoles.User.ToUpper() }
        );
        base.OnModelCreating(builder);
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess,
        CancellationToken cancellationToken = new())
    {
        UpdateDates();
        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new())
    {
        UpdateDates();
        return base.SaveChangesAsync(cancellationToken);
    }

    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
        UpdateDates();
        return base.SaveChanges(acceptAllChangesOnSuccess);
    }

    public override int SaveChanges()
    {
        UpdateDates();
        return base.SaveChanges();
    }

    private void UpdateDates()
    {
        var now = DateTime.UtcNow;
        foreach (var changedEntry in ChangeTracker.Entries())
        {
            if (changedEntry.Entity is not IEntity entity) continue;
            switch (changedEntry.State)
            {
                case EntityState.Added:
                    entity.CreatedAt = now;
                    entity.UpdatedAt = now;
                    break;
                case EntityState.Modified:
                    entity.UpdatedAt = now;
                    break;
            }
        }
    }
}