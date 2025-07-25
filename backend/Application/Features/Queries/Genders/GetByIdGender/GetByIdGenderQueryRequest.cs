using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Genders.GetByIdGender
{
    public class GetByIdGenderQueryRequest : IRequest<GetByIdGenderQueryResponse>
    {
        public int Id { get; set; }
    }
}
