namespace RouteTracker.Api.Endpoints;

public static class VermGradeEndpoints
{
    public static void MapVermGradeEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/vermgrades");
    }
}