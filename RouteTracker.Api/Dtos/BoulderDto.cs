using System.ComponentModel.DataAnnotations;

namespace RouteTracker.Api.Dtos;

public record BoulderDto(
    [Required] int Id,
    [Required][Range(1, 4)] int SectionNumber,
    [Required] string Color,
    string Grade,
    DateOnly SetDate
);