using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Brands.GetBrandsByCategoryName
{
    public class GetBrandsByCategoryNameQueryRequest : IRequest<GetBrandsByCategoryNameQueryResponse>
    {
        public string CategoryName { get; set; }
    }
}
