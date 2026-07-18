using Microsoft.EntityFrameworkCore;
using RouteTracker.Api.Models;

namespace RouteTracker.Api.Data;

public class RouteTrackerContext(DbContextOptions<RouteTrackerContext> options)
    : DbContext(options)
{
    public DbSet<Models.Route> Routes => Set<Models.Route>();

    public DbSet<Boulder> Boulders => Set<Boulder>();

    public DbSet<Color> Colors => Set<Color>();

    public DbSet<DecimalGrade> DecimalGrades => Set<DecimalGrade>();

    public DbSet<VermGrade> VermGrades => Set<VermGrade>();
}
