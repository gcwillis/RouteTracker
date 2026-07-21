using System.ComponentModel.DataAnnotations;

namespace RouteTracker.Api.Dtos;

public record CreateBoulderDto(
    [Required][Range(1, 4)] int SectionNumber,
    [Required] int ColorId,
    int VermGradeId,
    DateOnly SetDate
);