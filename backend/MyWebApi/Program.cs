using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using MyWebApi.API.Middleware;
using MyWebApi.Application.Interfaces;
using MyWebApi.Infrastructure.FileReaders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSingleton<IFileReaderService, JsonFileReader>();

var app = builder.Build();
app.UseCors(builder =>
    builder.WithOrigins("http://localhost:3000")
           .AllowAnyHeader()
           .AllowAnyMethod());

// Configure the HTTP request pipeline.
// Use custom middleware for logging
app.UseMiddleware<LoggingMiddleware>();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
