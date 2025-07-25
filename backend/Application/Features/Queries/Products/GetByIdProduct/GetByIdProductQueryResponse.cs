using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetByIdProduct
{
    public class GetByIdProductQueryResponse
    {
        public int Id { get; set; }
        public int GenderId { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Stock { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public bool BestSeller { get; set; }
    }
}
