namespace InventoryInvoiceAPI.Dtos
{

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
}
