    using Application.DTOs.Product;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace Application.Features.Queries.Products.GetAllProduct
    {
        public class GetAllProductQueryResponse
        {
            public List<GetListProductDto> Products { get; set; }
        }
    }
