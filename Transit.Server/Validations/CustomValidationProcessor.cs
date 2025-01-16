using FastEndpoints;

namespace Transit.Server.Validations;
public class CustomValidationProcessor : IGlobalAfterValidationProcessor
{
    public async Task AfterValidationAsync(IAfterValidationProcessorContext context, CancellationToken ct)
    {
        if (context.ValidationFailures.Count != 0)
        {
            var errors = context.ValidationFailures.Select(x => x.ErrorMessage).ToList();
            var response = new
            {
                Message = "Validation failed",
                Errors = errors
            };
            await context.HttpContext.Response.SendAsync(response, 400, cancellation: ct);
        }
    }
}