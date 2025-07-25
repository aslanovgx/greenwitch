using Application.DTOs.Category;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Categories.GetAllCategory
{
    public class GetAllCategoryQueryRequest : IRequest<GetAllCategoryQueryResponse>
    {
    }
}
