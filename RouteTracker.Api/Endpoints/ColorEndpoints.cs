using Microsoft.EntityFrameworkCore;
using RouteTracker.Api.Data;

namespace RouteTracker.Api.Endpoints;

public static class ColorEndpoints
{
    public static void MapColorEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/colors");

        group.MapGet("/", async (RouteTrackerContext dbContext) =>
        {
            var list = await dbContext.Colors.ToListAsync();
            return Results.Ok(list);
        });
    }
}
