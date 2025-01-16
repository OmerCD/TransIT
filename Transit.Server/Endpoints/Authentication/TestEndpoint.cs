using FastEndpoints;
using Transit.Server.Constants;

namespace Transit.Server.Endpoints.Authentication;

public class TestEndpoint : Ep.NoReq.NoRes
{
    public override void Configure()
    {
        Get("/test");
        Group<AuthenticationGroup>();
    }

    public override Task<object?> ExecuteAsync(CancellationToken ct)
    {
        return Task.FromResult("Hi" as object);
    }
}

public class AdminTestEndpoint : Ep.NoReq.NoRes
{
    public override void Configure()
    {
        Get("/admin-test");
        Group<AuthenticationGroup>();
        Roles(UserRoles.Admin);
    }

    public override Task<object?> ExecuteAsync(CancellationToken ct)
    {
        return Task.FromResult("Hi Admin" as object);
    }
}