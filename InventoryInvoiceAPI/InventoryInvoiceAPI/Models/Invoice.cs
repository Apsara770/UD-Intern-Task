namespace InventoryInvoiceAPI.Models
{
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; }
        public decimal GrandTotal { get; set; }
        public List<InvoiceItem> InvoiceItems { get; set; } = new();
    }
}
