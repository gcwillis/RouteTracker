using Microsoft.EntityFrameworkCore;
using RouteTracker.Api.Models;
using SQLitePCL;

namespace RouteTracker.Api.Data;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<RouteTrackerContext>();
        dbContext.Database.Migrate();
    }

    public static void AddRouteTrackerDb(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("RouteTracker");
        builder.Services.AddSqlite<RouteTrackerContext>(
            connectionString,
            optionsAction: options => options.UseSeeding((context, _) =>
            {
                if (!context.Set<Color>().Any())
                {
                    context.Set<Color>().AddRange(
                        new Color { ColorName = "Red" },
                        new Color { ColorName = "Orange" },
                        new Color { ColorName = "Yellow" },
                        new Color { ColorName = "Green" },
                        new Color { ColorName = "Blue" },
                        new Color { ColorName = "Purple" },
                        new Color { ColorName = "White" },
                        new Color { ColorName = "Black" }
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
            })
        );
    }
}
