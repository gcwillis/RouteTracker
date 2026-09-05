using Microsoft.EntityFrameworkCore;
using RouteTracker.Api.Data;
using RouteTracker.Api.Dtos;

namespace RouteTracker.Api.Endpoints;

public static class SetterEndpoints 
{
    public static void MapSetterEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/setters");

        group.MapPost("/", async (CreateSetterDto newSetter, RouteTrackerContext dbContext) =>
        {
            Models.Setter setter = new()
            {
                Name = newSetter.Name
            };

            dbContext.Setters.Add(setter);
            try
            {
                await dbContext.SaveChangesAsync();
            } catch
            {
                return Results.BadRequest();
            }
            return Results.Created();
        });

        group.MapGet("/", async (RouteTrackerContext dbContext) =>
        {
            var list = await dbContext.Setters.ToListAsync();
            return Results.Ok(list);
        });
    }
}