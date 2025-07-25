using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Brands.GetBrandsByCategory
{
    public class GetBrandsByCategoryQueryRequest : IRequest<GetBrandsByCategoryQueryResponse>
    {
    }
}
