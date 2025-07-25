using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Product
{
    public class GetListProductDto
    {
        public int Id { get; set; }
        public string GenderName { get; set; }
        public string CategoryName { get; set; }
        public string BrandName { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public decimal? DiscountPrice { get; set; }
        public bool BestSeller { get; set; }
        public string ? ShapeName { get; set; }
        public List<string> ColorNames { get; set; }
    }
}
