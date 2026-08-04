using Microsoft.EntityFrameworkCore;
using RouteTracker.Api.Data;

namespace RouteTracker.Api.Endpoints;

public static class DecimalGradeEndpoints
{
    public static void MapDecimalGradeEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/decimalgrades");

        group.MapGet("/", async (RouteTrackerContext dbContext) =>
        {
            var list = await dbContext.DecimalGrades.ToListAsync();
            return Results.Ok(list);
        });
    }
}
