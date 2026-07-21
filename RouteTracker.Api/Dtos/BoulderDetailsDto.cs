namespace RouteTracker.Api.Dtos;

public record BoulderDetailsDto(
    int Id,
    int SectionNumber,
    int ColorId,
    int VermGradeId,
    DateOnly? SetDate
);