using Application.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetAllNewProducts
{
    public class GetAllNewProductsQueryResponse
    {
        public List<GetAllNewProductsDto> Products { get; set; }
    }
}
