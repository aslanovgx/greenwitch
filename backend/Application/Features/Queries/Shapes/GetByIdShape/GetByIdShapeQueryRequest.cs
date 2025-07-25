using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Shapes.GetByIdShape
{
    public class GetByIdShapeQueryRequest : IRequest<GetByIdShapeQueryResponse>
    {
        public int Id { get; set; }
    }
}
