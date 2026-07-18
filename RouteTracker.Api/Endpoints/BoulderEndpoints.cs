using RouteTracker.Api.Dtos;
namespace RouteTracker.Api.Endpoints;

public static class BoulderEndpoints
{
    const string GetById = "GetBoulderById";
    private static readonly List<BoulderDto> boulders = [
        new (1, 1, "red", "V1", new DateOnly(2026, 1, 1))
    ];

    public static void MapBoulderEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/boulders");

        group.MapPost("/", (CreateBoulderDto newBoulder) =>
        {
            var boulder = new BoulderDto(
                boulders.Count + 1,
                newBoulder.SectionNumber,
                newBoulder.Color,
                newBoulder.Grade,
                newBoulder.SetDate
            );

            boulders.Add(boulder);

            return Results.CreatedAtRoute(GetById, new {id = boulder.Id}, boulder);
        });

        group.MapGet("/", () =>
        {
            return boulders;
        });

        group.MapGet("/{id}", (int id) =>
        {
            var res = boulders.Find(boulder => id == boulder.Id);
            return res is null ? Results.NotFound() : Results.Ok(res);
        })
        .WithName(GetById);

        group.MapPut("/{id}", (int id, CreateBoulderDto modifiedBoulder) =>
        {
            var res = boulders.Find(boulder => boulder.Id == id);
            if (res == null)
            {
                BoulderDto boulder = new (
                    boulders.Count + 1,
                    modifiedBoulder.SectionNumber,
                    modifiedBoulder.Color,
                    modifiedBoulder.Grade,
                    modifiedBoulder.SetDate
                );
                boulders.Add(boulder);
                return Results.CreatedAtRoute(GetById, new {id = boulder.Id}, boulder);
            } else
            {
                boulders[boulders.IndexOf(res)] = new BoulderDto (
                    res.Id,
                    modifiedBoulder.SectionNumber,
                    modifiedBoulder.Color,
                    modifiedBoulder.Grade,
                    modifiedBoulder.SetDate
                );
                return Results.NoContent();
            }
        });

        group.MapDelete("/{id}", (int id) =>
        {
            var res = boulders.Find(boulder => id == boulder.Id);
            if (res == null)
            {
                return Results.NotFound();
            } else
            {
                boulders.Remove(res);
                return Results.NoContent();
            }
        });
    }
}
