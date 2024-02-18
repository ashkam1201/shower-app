using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using showering_app.Data; // Import your DbContext
using showering_app.Models; // Import your ShowerReport model
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using showering_app.DTO;

[Route("api/[controller]")]
[ApiController]
public class ShowerReportController : ControllerBase
{
    private readonly AppDbContext _context;

    public ShowerReportController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/ShowerReport
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShowerReport>>> GetShowerReports()
    {
        return await _context.ShowerReports.ToListAsync();
    }

    // GET: api/ShowerReport/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ShowerReport>> GetShowerReport(int id)
    {
        var showerReport = await _context.ShowerReports.FindAsync(id);

        if (showerReport == null)
        {
            return NotFound();
        }

        return showerReport;
    }

    [HttpPost]
    public async Task<ActionResult<ShowerReport>> PostShowerReport(ShowerReportDto showerReportDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (!DateTime.TryParse(showerReportDto.Date, out var parsedDate))
        {
            ModelState.AddModelError("Date", "Invalid date format.");
            return BadRequest(ModelState);
        }

        var showerReport = new ShowerReport
        {
            Date = parsedDate,
            Hair = showerReportDto.Hair,
            Body = showerReportDto.Body,
            Shampoo = showerReportDto.Shampoo,
            ShowerGel = showerReportDto.ShowerGel
        };

        _context.ShowerReports.Add(showerReport);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetShowerReport), new { id = showerReport.Id }, showerReport);
    }



    // PUT: api/ShowerReport/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutShowerReport(int id, ShowerReport showerReport)
    {
        if (id != showerReport.Id)
        {
            return BadRequest();
        }

        _context.Entry(showerReport).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ShowerReportExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/ShowerReport/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteShowerReport(int id)
    {
        var showerReport = await _context.ShowerReports.FindAsync(id);
        if (showerReport == null)
        {
            return NotFound();
        }

        _context.ShowerReports.Remove(showerReport);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ShowerReportExists(int id)
    {
        return _context.ShowerReports.Any(e => e.Id == id);
    }
}
