using System.ComponentModel.DataAnnotations;

namespace showering_app.Models;

public class User
{
    [Key]
    public int UserId { get; set; }

    [Required]
    [StringLength(50)]
    public string Username { get; set; }

    [Required]
    [StringLength(100)] // Adjust the length as needed
    public string PasswordHash { get; set; }

    [Required]
    [StringLength(100)] // Adjust the length as needed
    public string PasswordSalt { get; set; }

    [Required]
    [EmailAddress]
    [StringLength(256)] // Adjust the length as needed
    public string Email { get; set; }

    // Add other user-related properties here as needed
}
