using System.ComponentModel.DataAnnotations;

namespace RouteTracker.Api.Models;

public class Boulder
{
    public int Id { get; set; }

    [Range(1, 4)]
    public required int SectionNumber { get; set; }

    public Color? Color { get; set; }

    public int ColorId { get; set; }

    public VermGrade? VermGrade { get; set; }

    public int VermGradeId { get; set; }

    public DateOnly? SetDate { get; set; }
}
