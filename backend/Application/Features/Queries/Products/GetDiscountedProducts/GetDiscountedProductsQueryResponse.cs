using Application.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetDiscountedProducts
{
    public class GetDiscountedProductsQueryResponse
    {
        public List<GetDiscountedProductsDto> Products { get; set; }
    }
}
