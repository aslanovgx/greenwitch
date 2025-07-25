using Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Product : BaseEntity
    {
        public int GenderId { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
        public int ? ShapeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }
        public int Stock { get; set; }
        public bool BestSeller { get; set; }

        public Gender Gender { get; set; }
        public Category Category { get; set; }
        public Brand Brand { get; set; }
        public Shape Shape { get; set; }
        public ICollection<ProductImage> ProductImages { get; set; }

        public ICollection<ProductColor> ProductColors { get; set; }
    }
}
