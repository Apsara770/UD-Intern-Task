namespace InventoryInvoiceAPI.Models
{
    public class InvoiceItem
    {
    public int InvoiceItemId { get; set; }
    public int InvoiceId { get; set; }
    public Invoice? Invoice { get; set; }
    public int ItemId { get; set; }
    public Item? Item { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Total { get; set; }
    }
}
