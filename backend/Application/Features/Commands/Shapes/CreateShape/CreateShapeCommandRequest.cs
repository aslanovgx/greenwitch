using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Shapes.CreateShape
{
    public class CreateShapeCommandRequest : IRequest<CreateShapeCommandResponse>
    {
        public  string Name { get; set; }
    }
}
