
using RouteTracker.Api.Data;
using RouteTracker.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();

var connectionString = "Data Source=RouteTracker.db";
builder.Services.AddSqlite<RouteTrackerContext>(connectionString);

var app = builder.Build();

app.MapRouteEndpoints();
app.MapBoulderEndpoints();

app.MigrateDb();

app.Run();
