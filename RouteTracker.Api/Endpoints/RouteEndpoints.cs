using RouteTracker.Api.Dtos;
namespace RouteTracker.Api.Endpoints;

public static class RouteEndpoints
{
    const string GetById = "GetRouteById";
    private static readonly List<RouteDto> routes = [
        new (1, 1, "Red", "5.11", new DateOnly(2026, 1, 1))
    ];

    public static void MapRouteEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/routes");

        group.MapPost("/", (CreateRouteDto newRoute) =>
        {
            RouteDto route = new(
                routes.Count + 1,
                newRoute.WallNumber,
                newRoute.Color,
                newRoute.Grade,
                newRoute.SetDate
            );

            routes.Add(route);

            return Results.CreatedAtRoute(GetById, new {id = route.Id}, route);
        });

        group.MapGet("/", () => routes);

        group.MapGet("/{id}", (int id) =>
        {
            var res = routes.Find(route => route.Id == id);
            return res is null ? Results.NotFound() : Results.Ok(res);
        })
        .WithName(GetById);

        group.MapPut("/{id}", (int id, RouteDto modifiedRoute) =>
        {
            var res = routes.Find(route => route.Id == id);
            if (res == null)
            {
                RouteDto route = new(
                    routes.Count + 1,
                    modifiedRoute.WallNumber,
                    modifiedRoute.Color,
                    modifiedRoute.Grade,
                    modifiedRoute.SetDate
                );
                routes.Add(route);
                return Results.CreatedAtRoute(GetById, new {id = modifiedRoute.Id}, modifiedRoute);
            } else
            {
                routes[routes.IndexOf(res)] = new RouteDto(
                    res.Id,
                    modifiedRoute.WallNumber,
                    modifiedRoute.Color,
                    modifiedRoute.Grade,
                    modifiedRoute.SetDate
                );
                return Results.NoContent();

            }
        });

        group.MapDelete("/{id}", (int id) =>
        {
            var res = routes.Find(route => id == route.Id);
            if (res == null)
            {
                return Results.NotFound();
            } else
            {
                routes.Remove(res);
                return Results.NoContent();
            }
        });
    }
}
