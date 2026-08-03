namespace RouteTracker.Api.Models;

public class Color
{
    public int Id { get; set; }

    public required string ColorName { get; set; }

    public required string HexCode { get; set; }
}
