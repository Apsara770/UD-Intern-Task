using InventoryInvoiceAPI.Data;
using InventoryInvoiceAPI.Dtos;
using InventoryInvoiceAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryInvoiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly AppDbContext _db;
        public InvoicesController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> Get() =>
            Ok(await _db.Invoices.Include(i => i.InvoiceItems).ThenInclude(ii => ii.Item).ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var invoice = await _db.Invoices
                                   .Include(i => i.InvoiceItems)
                                   .ThenInclude(ii => ii.Item)
                                   .FirstOrDefaultAsync(i => i.InvoiceId == id);
            return invoice == null ? NotFound() : Ok(invoice);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] InvoiceCreateDto dto)
        {
            var invoice = new Invoice
            {
                CustomerName = dto.CustomerName,
                InvoiceDate = dto.InvoiceDate,
                InvoiceItems = new List<InvoiceItem>()
            };

            decimal grandTotal = 0m;
            foreach (var it in dto.Items)
            {
                var item = await _db.Items.FindAsync(it.ItemId);
                if (item == null) return BadRequest($"Item {it.ItemId} not found.");

                var lineTotal = item.Price * it.Quantity;
                grandTotal += lineTotal;

                var invoiceItem = new InvoiceItem
                {
                    ItemId = item.ItemId,
                    Quantity = it.Quantity,
                    UnitPrice = item.Price,
                    Total = lineTotal
                };

                // Update stock
                item.StockQuantity -= it.Quantity;
                _db.Entry(item).State = EntityState.Modified;

                invoice.InvoiceItems.Add(invoiceItem);
            }

            invoice.GrandTotal = grandTotal;
            _db.Invoices.Add(invoice);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = invoice.InvoiceId }, invoice);
        }

        //  DELETE endpoint
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var invoice = await _db.Invoices
                                   .Include(i => i.InvoiceItems)
                                   .FirstOrDefaultAsync(i => i.InvoiceId == id);

            if (invoice == null)
                return NotFound();

            // Remove related invoice items first (if foreign key exists)
            _db.InvoiceItems.RemoveRange(invoice.InvoiceItems);

            _db.Invoices.Remove(invoice);
            await _db.SaveChangesAsync();

            return NoContent(); // 204
        }
    }
}
