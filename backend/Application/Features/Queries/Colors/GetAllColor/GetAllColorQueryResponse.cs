using Application.DTOs.Color;
using Application.DTOs.Gender;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Colors.GetAllColor
{
    public class GetAllColorQueryResponse
    {
        public List<GetListColorDto> Colors { get; set; }
    }
}
