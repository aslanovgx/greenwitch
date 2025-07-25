using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Colors.CreateColor
{
    public class CreateColorCommandRequest : IRequest<CreateColorCommandResponse>
    {
        public string Name { get; set; }
    }
}
