using Application.DTOs.Brand;
using Application.Repositories.Brands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Brands.GetBrandsByCategory
{
    public class GetBrandsByCategoryQueryHandler : IRequestHandler<GetBrandsByCategoryQueryRequest, GetBrandsByCategoryQueryResponse>
    {
        readonly IBrandReadRepository _brandReadRepository;

        public GetBrandsByCategoryQueryHandler(IBrandReadRepository brandReadRepository)
        {
            _brandReadRepository = brandReadRepository;
        }

        public async Task<GetBrandsByCategoryQueryResponse> Handle(GetBrandsByCategoryQueryRequest request, CancellationToken cancellationToken)
        {
            List<GetBrandsByCategoryDto> brands = await _brandReadRepository.GetAll(false)
                                                  .Select(b => new GetBrandsByCategoryDto()
                                                  {
                                                      Id = b.Id,
                                                      CategoryName = b.Category.Name,
                                                      Name = b.Name
                                                  }).ToListAsync();

            return new()
            {
                Brands = brands
            };
        }
    }
}
