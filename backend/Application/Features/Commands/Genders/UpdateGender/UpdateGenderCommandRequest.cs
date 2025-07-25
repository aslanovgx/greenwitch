using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Genders.UpdateGender
{
    public class UpdateGenderCommandRequest : IRequest<UpdateGenderCommandResponse>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
