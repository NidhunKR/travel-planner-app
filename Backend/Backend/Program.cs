using Backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ----------------- Add Services -----------------

// Add Controllers
builder.Services.AddControllers();

// ✅ Configure Postgres
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// ✅ Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Configure CORS for your frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // your React dev URL
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// ----------------- Build App -----------------
var app = builder.Build();

// ✅ Use Swagger in dev + prod
app.UseSwagger();
app.UseSwaggerUI();

// ✅ Use CORS (order matters!)
app.UseCors("AllowReact");

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
