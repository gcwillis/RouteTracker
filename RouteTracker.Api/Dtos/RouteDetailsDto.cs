namespace RouteTracker.Api.Dtos;

public record RouteDetailsDto(
    int Id,
    int WallNumber,
    int ColorId,
    int GradeId,
    DateOnly? SetDate
);
