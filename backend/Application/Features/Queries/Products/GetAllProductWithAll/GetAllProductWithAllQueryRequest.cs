using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetAllProductWithAll
{
    public class GetAllProductWithAllQueryRequest : IRequest<GetAllProductWithAllQueryResponse>
    {
        public int Page { get; set; } = 0;
        public int Size { get; set; } = 10;
        public int? CategoryId { get; set; }
    }
}
