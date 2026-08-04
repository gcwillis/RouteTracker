using RouteTracker.Api.Data;
using RouteTracker.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();
builder.AddRouteTrackerDb();

var app = builder.Build();

app.MapRouteEndpoints();
app.MapBoulderEndpoints();
app.MapColorEndpoints();
app.MapDecimalGradeEndpoints();

app.MigrateDb();

app.Run();
