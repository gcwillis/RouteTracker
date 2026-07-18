using System.ComponentModel.DataAnnotations;

namespace RouteTracker.Api.Models;

public class Route
{
    public int Id { get; set; }

    [Range(1, 52)]
    public required int WallNumber { get; set; }

    public Color? Color { get; set; }

    public int ColorId { get; set; }

    public DecimalGrade? DecimalGrade { get; set; }

    public int DecimalGradeId { get; set;}

    public DateOnly? SetDate { get; set; }
}
