using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Orders.CancelOrder
{
    public class CancelOrderCommandRequest : IRequest<bool>
    {
        public int OrderId { get; set; }
    }
}
