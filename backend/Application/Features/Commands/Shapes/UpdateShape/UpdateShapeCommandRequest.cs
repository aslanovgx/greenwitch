using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Shapes.UpdateShape
{
    public class UpdateShapeCommandRequest : IRequest<UpdateShapeCommandResponse>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
