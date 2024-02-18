
namespace showering_app.Models;

public class ShowerReport
{
    public int Id { get; set; } // Primary key
    public DateTime Date { get; set; }
    public bool Hair { get; set; }
    public bool Body { get; set; }
    public string? Shampoo { get; set; }
    public string? ShowerGel { get; set; }
}