using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Transit.Server.Database;
using Transit.Server.Database.Entity;

namespace Transit.Server.Extensions;

public static class ServiceExtensions
{
    public static void AddTransitDbContext(this IServiceCollection services, string connectionString, bool isProduction)
    {
        services.AddDbContext<TransitDbContext>(options => options.UseNpgsql(connectionString));
        services.AddIdentity<UserEntity, RoleEntity>()
            .AddEntityFrameworkStores<TransitDbContext>();
        services.Configure<IdentityOptions>(options =>
        {
            options.User.RequireUniqueEmail = true;
            
            if (isProduction)
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredLength = 8;
                options.Password.RequiredUniqueChars = 1;

                options.User.AllowedUserNameCharacters =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";

                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;
            }
            else
            {
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 1;
            }
        });
    }
}