using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Product
{
    public class GetAllProductWithAllDto
    {
        public int Id { get; set; }
        public int GenderId { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
        public int ? ShapeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool BestSeller { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountPrice { get; set; }
        public int Stock { get; set; }
        public string GenderName { get; set; }
        public string CategoryName { get; set; }
        public string BrandName { get; set; }
        public string ShapeName { get; set; }
        public List<string> ColorNames { get; set; }
        public List<string> Images { get; set; }
    }
}
