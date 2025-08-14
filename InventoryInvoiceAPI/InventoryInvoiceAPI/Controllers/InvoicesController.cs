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

        // GET all invoices with items
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var invoices = await _db.Invoices
                .Include(i => i.InvoiceItems)
                .ThenInclude(ii => ii.Item)
                .AsNoTracking()
                .Select(i => new InvoiceDto
                {
                    InvoiceId = i.InvoiceId,
                    CustomerName = i.CustomerName,
                    InvoiceDate = i.InvoiceDate,
                    GrandTotal = i.GrandTotal,
                    Items = i.InvoiceItems.Select(ii => new InvoiceItemDto
                    {
                        ItemId = ii.ItemId,
                        ItemName = ii.Item.Name,
                        Quantity = ii.Quantity,
                        UnitPrice = ii.UnitPrice,
                        Total = ii.Total
                    }).ToList()
                }).ToListAsync();

            return Ok(invoices);
        }

        // GET a single invoice by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var invoice = await _db.Invoices
                .Include(i => i.InvoiceItems)
                .ThenInclude(ii => ii.Item)
                .AsNoTracking()
                .Where(i => i.InvoiceId == id)
                .Select(i => new InvoiceDto
                {
                    InvoiceId = i.InvoiceId,
                    CustomerName = i.CustomerName,
                    InvoiceDate = i.InvoiceDate,
                    GrandTotal = i.GrandTotal,
                    Items = i.InvoiceItems.Select(ii => new InvoiceItemDto
                    {
                        ItemId = ii.ItemId,
                        ItemName = ii.Item.Name,
                        Quantity = ii.Quantity,
                        UnitPrice = ii.UnitPrice,
                        Total = ii.Total
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            return invoice == null ? NotFound() : Ok(invoice);
        }

        // CREATE a new invoice
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] InvoiceCreateDto dto)
        {
            if (dto == null || dto.Items == null || !dto.Items.Any())
                return BadRequest("Invoice must contain at least one item.");

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
                if (item == null)
                    return BadRequest($"Item {it.ItemId} not found.");

                if (item.StockQuantity < it.Quantity)
                    return BadRequest($"Not enough stock for item '{item.Name}'.");

                var lineTotal = item.Price * it.Quantity;
                grandTotal += lineTotal;

                invoice.InvoiceItems.Add(new InvoiceItem
                {
                    ItemId = item.ItemId,
                    Quantity = it.Quantity,
                    UnitPrice = item.Price,
                    Total = lineTotal
                });

                // Update stock
                item.StockQuantity -= it.Quantity;
            }

            invoice.GrandTotal = grandTotal;

            _db.Invoices.Add(invoice);
            await _db.SaveChangesAsync();

            // Return the newly created invoice as DTO
            var createdInvoice = await _db.Invoices
                .Include(i => i.InvoiceItems)
                .ThenInclude(ii => ii.Item)
                .AsNoTracking()
                .Where(i => i.InvoiceId == invoice.InvoiceId)
                .Select(i => new InvoiceDto
                {
                    InvoiceId = i.InvoiceId,
                    CustomerName = i.CustomerName,
                    InvoiceDate = i.InvoiceDate,
                    GrandTotal = i.GrandTotal,
                    Items = i.InvoiceItems.Select(ii => new InvoiceItemDto
                    {
                        ItemId = ii.ItemId,
                        ItemName = ii.Item.Name,
                        Quantity = ii.Quantity,
                        UnitPrice = ii.UnitPrice,
                        Total = ii.Total
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            return CreatedAtAction(nameof(Get), new { id = invoice.InvoiceId }, createdInvoice);
        }

        // DELETE an invoice
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var invoice = await _db.Invoices
                .Include(i => i.InvoiceItems)
                .FirstOrDefaultAsync(i => i.InvoiceId == id);

            if (invoice == null)
                return NotFound();

            _db.InvoiceItems.RemoveRange(invoice.InvoiceItems);
            _db.Invoices.Remove(invoice);

            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}