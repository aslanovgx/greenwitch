using Application.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetAllProductWithAll
{
    public class GetAllProductWithAllQueryResponse
    {
            public List<GetAllProductWithAllDto> Products { get; set; }
            public int TotalCount { get; set; }
            public int TotalPages { get; set; }
     
    }
}
