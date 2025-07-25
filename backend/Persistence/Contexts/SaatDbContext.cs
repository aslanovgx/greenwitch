using Domain.Entities;
using Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Contexts
{
    public class SaatDbContext : DbContext
    {
        public SaatDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Gender> Genders { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Shape> Shapes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<ProductColor> ProductColors { get; set; }



        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            foreach (var entry in ChangeTracker.Entries<BaseEntity>()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified))
            {
                entry.Entity.UpdatedDate = DateTime.Now;
                if (entry.State == EntityState.Added)
                    entry.Entity.CreatedDate = DateTime.Now;
                else
                    entry.Property(x => x.CreatedDate).IsModified = false;
            }

            return await base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Product → Brand (Cascade) - Yalnız bunda Cascade saxlanılır
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Brand)
                .WithMany(b => b.Products)
                .HasForeignKey(p => p.BrandId)
                .OnDelete(DeleteBehavior.Cascade);

            // Product → Category (Restrict)
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            // Product → Gender (Restrict)
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Gender)
                .WithMany(g => g.Products)
                .HasForeignKey(p => p.GenderId)
                .OnDelete(DeleteBehavior.Restrict);

            // Brand → Category (Restrict)
            modelBuilder.Entity<Brand>()
                .HasOne(b => b.Category)
                .WithMany(c => c.Brands)
                .HasForeignKey(b => b.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<ProductColor>()
     .HasKey(pc => new { pc.ProductId, pc.ColorId });

            modelBuilder.Entity<ProductColor>()
                .HasOne(pc => pc.Product)
                .WithMany(p => p.ProductColors)
                .HasForeignKey(pc => pc.ProductId);

            modelBuilder.Entity<ProductColor>()
                .HasOne(pc => pc.Color)
                .WithMany(c => c.ProductColors)
                .HasForeignKey(pc => pc.ColorId);


        }

    }

}