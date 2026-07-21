using System.ComponentModel.DataAnnotations;

namespace RouteTracker.Api.Dtos;

public record CreateRouteDto(
    [Required][Range(1, 52)] int WallNumber,
    [Required] int ColorId,
    int DecimalGradeId,
    DateOnly SetDate
);