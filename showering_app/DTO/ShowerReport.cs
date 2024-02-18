namespace showering_app.DTO;

public class ShowerReportDto
{
    public string Date { get; set; }
    public bool Hair { get; set; }
    public bool Body { get; set; }
    public string? Shampoo { get; set; }
    public string? ShowerGel { get; set; }

    // Add other properties as needed
}
