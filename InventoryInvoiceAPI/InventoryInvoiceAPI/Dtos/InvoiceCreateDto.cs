namespace InventoryInvoiceAPI.Dtos
{
    // DTOs used when creating a new invoice
    public class InvoiceItemCreateDto
    {
        public int ItemId { get; set; }
        public int Quantity { get; set; }
    }

    public class InvoiceCreateDto
    {
        public string CustomerName { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; }
        public List<InvoiceItemCreateDto> Items { get; set; } = new List<InvoiceItemCreateDto>();
    }

    // DTOs used when retrieving invoices from API
    public class InvoiceItemDto
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Total { get; set; }
    }

    public class InvoiceDto
    {
        public int InvoiceId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; }
        public decimal GrandTotal { get; set; }
        public List<InvoiceItemDto> Items { get; set; } = new List<InvoiceItemDto>();
    }
}