using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Colors.GetByIdColor
{
    public class GetByIdColorQueryRequest : IRequest<GetByIdColorQueryResponse>
    {
        public int Id { get; set; }

    }
}
