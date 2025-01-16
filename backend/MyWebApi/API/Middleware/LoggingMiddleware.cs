using System.Diagnostics;

namespace MyWebApi.API.Middleware;
public class LoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<LoggingMiddleware> _logger;

    public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();

        // Log the request details
        _logger.LogInformation("Incoming Request: {Method} {Path}", context.Request.Method, context.Request.Path);

        await _next(context); // Proceed to the next middleware

        stopwatch.Stop();

        // Log the response details
        _logger.LogInformation("Response: {StatusCode} in {ElapsedMilliseconds}ms",
            context.Response.StatusCode, stopwatch.ElapsedMilliseconds);
    }
}
