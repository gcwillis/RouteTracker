using System.ComponentModel.DataAnnotations;

namespace RouteTracker.Api.Dtos;

public record BoulderDto(
    [Required] int Id,
    [Required][Range(1, 4)] int SectionNumber,
    [Required] int ColorId,
    int VermGradeId,
    DateOnly SetDate
);