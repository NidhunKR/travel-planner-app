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

// 👇 ADD THIS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});


var app = builder.Build();
app.UseCors("AllowAll");

app.UseSwagger();
app.UseSwaggerUI();

// 👇 ADD THIS (order matters)
app.UseCors("AllowReact");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
