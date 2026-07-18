using Microsoft.EntityFrameworkCore;

namespace RouteTracker.Api.Data;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<RouteTrackerContext>();
        dbContext.Database.Migrate();
    }
}
