using Application.Features.Queries.Products.GetAllProductWithAll;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetProductsByFilter
{
    public class GetProductsByFilterQueryRequest : IRequest<GetAllProductWithAllQueryResponse>
    {
        public int? GenderId { get; set; }
        public int? BrandId { get; set; }
        public int? ShapeId { get; set; }
        public int? CategoryId { get; set; }  

        public List<int>? ColorIds { get; set; }

        public int Page { get; set; } = 0;
        public int Size { get; set; } = 5;
    }

}
