using Backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        "Server=(localdb)\\MSSQLLocalDB;Database=TravelPlannerDB;Trusted_Connection=True;"
    ));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ FIXED CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowReact");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
