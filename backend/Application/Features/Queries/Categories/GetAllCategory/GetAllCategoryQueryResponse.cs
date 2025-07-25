using Application.DTOs.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Categories.GetAllCategory
{
    public class GetAllCategoryQueryResponse
    {
        public List<GetListCategoryDto> Categories { get; set; }
    }
}
