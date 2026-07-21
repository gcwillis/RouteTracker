using Microsoft.EntityFrameworkCore;
using RouteTracker.Api.Data;
using RouteTracker.Api.Dtos;

namespace RouteTracker.Api.Endpoints;

public static class RouteEndpoints
{
    const string GetById = "GetRouteById";

    public static void MapRouteEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/routes");

        group.MapPost("/", async (CreateRouteDto newRoute, RouteTrackerContext dbContext) =>
        {
            Models.Route route = new()
            {
                WallNumber = newRoute.WallNumber,
                ColorId = newRoute.ColorId,
                DecimalGradeId = newRoute.DecimalGradeId,
                SetDate = newRoute.SetDate
            };

            dbContext.Routes.Add(route);
            await dbContext.SaveChangesAsync();

            RouteDetailsDto routeDto = new(
                route.Id,
                route.WallNumber,
                route.ColorId,
                route.DecimalGradeId,
                route.SetDate
            );

            return Results.CreatedAtRoute(GetById, new {id = routeDto.Id}, routeDto);
        });

        group.MapGet("/", async (RouteTrackerContext dbContext) =>
        {
            await dbContext.Routes.ToListAsync();
        });

        group.MapGet("/{id}", async (int id, RouteTrackerContext dbContext) =>
        {
            var route = await dbContext.Routes.FindAsync(id);

            return route is null ? Results.NotFound() : Results.Ok(
                new RouteDetailsDto(
                    route.Id,
                    route.WallNumber,
                    route.ColorId,
                    route.DecimalGradeId,
                    route.SetDate
                )
            );
        })
        .WithName(GetById);

        group.MapPut("/{id}", async (int id, CreateRouteDto modifiedRoute, RouteTrackerContext dbContext) =>
        {
            var route = await dbContext.Routes.FindAsync(id);
            if (route == null)
            {
                Models.Route newRoute = new()
                {
                    WallNumber = modifiedRoute.WallNumber,
                    ColorId = modifiedRoute.ColorId,
                    DecimalGradeId = modifiedRoute.DecimalGradeId,
                    SetDate = modifiedRoute.SetDate
                };
                dbContext.Routes.Add(newRoute);
                await dbContext.SaveChangesAsync();

                RouteDetailsDto routeDto = new(
                    newRoute.Id,
                    newRoute.WallNumber,
                    newRoute.ColorId,
                    newRoute.DecimalGradeId,
                    newRoute.SetDate
                );
                
                return Results.CreatedAtRoute(GetById, new {id = routeDto.Id}, routeDto);
            } else
            {
                route.WallNumber = modifiedRoute.WallNumber;
                route.ColorId = route.ColorId;
                route.DecimalGradeId = modifiedRoute.DecimalGradeId;
                route.SetDate = modifiedRoute.SetDate;

                await dbContext.SaveChangesAsync();
                return Results.NoContent();

            }
        });

        group.MapDelete("/{id}", async (int id, RouteTrackerContext dbContext) =>
        {
            var route = await dbContext.Routes.FindAsync(id);
            if (route == null)
            {
                return Results.NotFound();
            } else
            {
                dbContext.Routes.Remove(route);
                dbContext.SaveChanges();
                return Results.NoContent();
            }
        });
    }
}
