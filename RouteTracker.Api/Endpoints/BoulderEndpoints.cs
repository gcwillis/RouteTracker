using Microsoft.EntityFrameworkCore;
using RouteTracker.Api.Data;
using RouteTracker.Api.Dtos;
using RouteTracker.Api.Models;

namespace RouteTracker.Api.Endpoints;

public static class BoulderEndpoints
{
    const string GetById = "GetBoulderById";

    public static void MapBoulderEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/boulders");

        group.MapPost("/", async (CreateBoulderDto newBoulder, RouteTrackerContext dbContext) =>
        {
            Boulder boulder = new()
            {
                SectionNumber = newBoulder.SectionNumber,
                ColorId = newBoulder.ColorId,
                VermGradeId = newBoulder.VermGradeId,
                SetDate = newBoulder.SetDate
            };

            dbContext.Boulders.Add(boulder);
            await dbContext.SaveChangesAsync();

            BoulderDetailsDto boulderDto = new(
                boulder.Id,
                boulder.SectionNumber,
                boulder.ColorId,
                boulder.VermGradeId,
                boulder.SetDate
            );

            return Results.CreatedAtRoute(GetById, new {id = boulderDto.Id}, boulderDto);
        });

        group.MapGet("/", async (RouteTrackerContext dbContext) =>
        {
            var list = await dbContext.Boulders.ToListAsync();
            return Results.Ok(list);
        });

        group.MapGet("/{id}", async (int id, RouteTrackerContext dbContext) =>
        {
            var boulder = await dbContext.Boulders.FindAsync(id);

            return boulder is null ? Results.NotFound() : Results.Ok(
                new BoulderDetailsDto(
                    boulder.Id,
                    boulder.SectionNumber,
                    boulder.ColorId,
                    boulder.VermGradeId,
                    boulder.SetDate
                )
            );
        })
        .WithName(GetById);

        group.MapPut("/{id}", async (int id, CreateBoulderDto modifiedBoulder, RouteTrackerContext dbContext) =>
        {
            var boulder = await dbContext.Boulders.FindAsync(id);
            if (boulder == null)
            {
                Boulder newBoulder = new()
                {
                    SectionNumber = modifiedBoulder.SectionNumber,
                    ColorId = modifiedBoulder.ColorId,
                    VermGradeId = modifiedBoulder.VermGradeId,
                    SetDate = modifiedBoulder.SetDate
                };
                dbContext.Boulders.Add(newBoulder);
                await dbContext.SaveChangesAsync();

                BoulderDetailsDto boulderDto = new(
                    newBoulder.Id,
                    newBoulder.SectionNumber,
                    newBoulder.ColorId,
                    newBoulder.VermGradeId,
                    newBoulder.SetDate
                );
                
                return Results.CreatedAtRoute(GetById, new {id = boulderDto.Id}, boulderDto);
            } else
            {
                boulder.SectionNumber = modifiedBoulder.SectionNumber;
                boulder.ColorId = modifiedBoulder.ColorId;
                boulder.VermGradeId = modifiedBoulder.VermGradeId;
                boulder.SetDate = modifiedBoulder.SetDate;

                await dbContext.SaveChangesAsync();
                return Results.NoContent();

            }
        });

        group.MapDelete("/{id}", async (int id, RouteTrackerContext dbContext) =>
        {
            var boulder = await dbContext.Boulders.FindAsync(id);
            if (boulder == null)
            {
                return Results.NotFound();
            } else
            {
                dbContext.Boulders.Remove(boulder);
                dbContext.SaveChanges();
                return Results.NoContent();
            }
        });
    }
}
