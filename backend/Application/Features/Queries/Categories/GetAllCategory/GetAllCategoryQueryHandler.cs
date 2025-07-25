using Application.DTOs.Category;
using Application.Repositories.Categories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Categories.GetAllCategory
{
    public class GetAllCategoryQueryHandler : IRequestHandler<GetAllCategoryQueryRequest, GetAllCategoryQueryResponse>
    {
        readonly ICategoryReadRepository _categoryReadRepository;

        public GetAllCategoryQueryHandler(ICategoryReadRepository categoryReadRepository)
        {
            _categoryReadRepository = categoryReadRepository;
        }

        public async Task<GetAllCategoryQueryResponse> Handle(GetAllCategoryQueryRequest request, CancellationToken cancellationToken)
        {
            List<GetListCategoryDto> categories = await _categoryReadRepository.GetAll(false).Select(c => new GetListCategoryDto //         GetListCategoryDto() Hər ikisi eynidir.
            {
                Id = c.Id,
                Name = c.Name
            }).ToListAsync();

            return new()
            {
                Categories = categories
            };
        }
    }

    
}
