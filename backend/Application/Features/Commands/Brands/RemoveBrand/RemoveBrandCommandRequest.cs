using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Brands.RemoveBrand
{
    public class RemoveBrandCommandRequest : IRequest<RemoveBrandCommandResponse>
    {
        public int Id { get; set; }
    }
}
