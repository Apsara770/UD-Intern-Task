using Microsoft.EntityFrameworkCore;
using InventoryInvoiceAPI.Models;

namespace InventoryInvoiceAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Item> Items { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceItem> InvoiceItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Ensure EF Core knows the relationship
            modelBuilder.Entity<InvoiceItem>()
                        .HasOne(ii => ii.Invoice)
                        .WithMany(i => i.InvoiceItems)
                        .HasForeignKey(ii => ii.InvoiceId);

            modelBuilder.Entity<InvoiceItem>()
                        .HasOne(ii => ii.Item)
                        .WithMany()
                        .HasForeignKey(ii => ii.ItemId);
        }
    }
}
