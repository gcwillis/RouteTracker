using Microsoft.EntityFrameworkCore;
using RouteTracker.Api.Models;

namespace RouteTracker.Api.Data;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<RouteTrackerContext>();
        dbContext.Database.Migrate();
        SeedData(dbContext);
    }

    public static void AddRouteTrackerDb(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("RouteTracker");
        builder.Services.AddSqlite<RouteTrackerContext>(
            connectionString,
            optionsAction: options => options.UseSeeding((context, _) => SeedData((RouteTrackerContext)context))
        );
    }

    private static void SeedData(RouteTrackerContext context)
    {
        if (!context.Set<Color>().Any())
        {
            context.Set<Color>().AddRange(
                new Color { ColorName = "Red", HexCode = "#BD0000" },
                new Color { ColorName = "Orange", HexCode = "#DE4A00" },
                new Color { ColorName = "Yellow", HexCode = "#FFEE14" },
                new Color { ColorName = "Green", HexCode = "#1D8216" },
                new Color { ColorName = "Blue", HexCode = "#0072C4" },
                new Color { ColorName = "Purple", HexCode = "#4E1C8A" },
                new Color { ColorName = "Pink", HexCode = "#FF00FF" },
                new Color { ColorName = "White", HexCode = "#F2F2F2" },
                new Color { ColorName = "Black", HexCode = "#212121" }
            );
        }

        if (!context.Set<DecimalGrade>().Any())
        {
            context.Set<DecimalGrade>().AddRange(
                new DecimalGrade { GradeValue = "5.7" },
                new DecimalGrade { GradeValue = "5.8" },
                new DecimalGrade { GradeValue = "5.9" },
                new DecimalGrade { GradeValue = "5.10" },
                new DecimalGrade { GradeValue = "5.11" },
                new DecimalGrade { GradeValue = "5.12" },
                new DecimalGrade { GradeValue = "5.13" }
            );
        }

        if (!context.Set<VermGrade>().Any())
        {
            context.Set<VermGrade>().AddRange(
                new VermGrade { GradeValue = "V0" },
                new VermGrade { GradeValue = "V1" },
                new VermGrade { GradeValue = "V2" },
                new VermGrade { GradeValue = "V3" },
                new VermGrade { GradeValue = "V4" },
                new VermGrade { GradeValue = "V5" },
                new VermGrade { GradeValue = "V6" },
                new VermGrade { GradeValue = "V7" },
                new VermGrade { GradeValue = "V8" },
                new VermGrade { GradeValue = "V9" }
            );
        }

        if (!context.Set<Setter>().Any())
        {
            context.Set<Setter>().AddRange(
                new Setter { Name = "Grant" }
            );
        }

        if (context.ChangeTracker.HasChanges())
        {
            context.SaveChanges();
        }
    }
}
