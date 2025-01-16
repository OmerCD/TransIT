using FastEndpoints;

namespace Transit.Server.Endpoints.Authentication;

public sealed class AuthenticationGroup : Group
{
    public AuthenticationGroup()
    {
        Configure("authentication", definition =>
        {
            definition.Description(x =>
            {
                x.WithDescription("Authentication endpoints").WithTags("Authentication");
            });
        });
    }
}