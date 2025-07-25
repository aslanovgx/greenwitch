using Application.DTOs.Brand;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Brands.GetBrandsByCategoryName
{
    public class GetBrandsByCategoryNameQueryResponse
    {
        public List<GetBrandsByCategoryNameDto> Brands { get; set; }
    }
}
