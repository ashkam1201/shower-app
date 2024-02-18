using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using showering_app.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllersWithViews();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        // Add date parsing configuration here if needed
    });


// Define the CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowWebApp",
        policy => policy.WithOrigins("https://localhost:44430") // Replace with the actual origin of your Angular app
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()); // Use this only if your front-end needs to send credentials like cookies or auth headers
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Apply the CORS policy to the application
app.UseCors("AllowWebApp");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();