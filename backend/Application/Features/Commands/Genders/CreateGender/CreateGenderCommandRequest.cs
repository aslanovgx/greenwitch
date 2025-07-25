using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Genders.CreateGender
{
    public class CreateGenderCommandRequest : IRequest<CreateGenderCommandResponse>
    {
        public string Name { get; set; }
    }
}
