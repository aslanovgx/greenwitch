using Application;
using Application.Services;
using Persistence;
using Persistence.Services;
public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Servisl?r
        builder.Services.AddPersistenceServices(builder.Configuration);
        builder.Services.AddApplicationServices();

        // CORS siyas?ti (Next.js v? AdminPanel üçün icaz?)
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAllClients", policy =>
            {
                policy.WithOrigins(
                    "https://localhost:7016",   // AdminPanel (MVC)
                    "http://localhost:3000"     // Next.js frontend
                )
                .AllowAnyHeader()
                .AllowAnyMethod();
            });
        });

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
      
        builder.Services.AddAuthorization();
        var app = builder.Build();

        // Swagger
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseStaticFiles();

        app.UseHttpsRedirection();

        // CORS t?tbiqi
        app.UseCors("AllowAllClients");

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}