using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Genders.RemoveGender
{
    public class RemoveGenderCommandRequest : IRequest<RemoveGenderCommandResponse>
    {
        public int Id { get; set; }
    }
}
