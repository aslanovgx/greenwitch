using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Categories.RemoveCategory
{
    public class RemoveCategoryCommandRequest : IRequest<RemoveCategoryCommandResponse>
    {
        public int GenderId { get; set; }
        public int Id { get; set; }
    }
}
