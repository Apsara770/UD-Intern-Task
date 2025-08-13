using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InventoryInvoiceAPI.Data;
using InventoryInvoiceAPI.Models;

namespace InventoryInvoiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ItemsController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _db.Items.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var item = await _db.Items.FindAsync(id);
            return item == null ? NotFound() : Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Item item)
        {
            _db.Items.Add(item);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = item.ItemId }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Item item)
        {
            if (id != item.ItemId) return BadRequest();
            _db.Entry(item).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _db.Items.FindAsync(id);
            if (item == null) return NotFound();
            _db.Items.Remove(item);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
