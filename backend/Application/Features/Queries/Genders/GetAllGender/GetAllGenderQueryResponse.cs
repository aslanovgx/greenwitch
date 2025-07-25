using Application.DTOs.Gender;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Genders.GetAllGender
{
    public class GetAllGenderQueryResponse
    {
        public List<GetListGenderDto> Genders { get; set; }
    }
}
