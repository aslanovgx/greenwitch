using Application.DTOs.Brand;
using Application.Repositories.Brands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Brands.GetBrandsByCategoryName
{
    public class GetBrandsByCategoryNameQueryHandler : IRequestHandler<GetBrandsByCategoryNameQueryRequest, GetBrandsByCategoryNameQueryResponse>
    {
        readonly IBrandReadRepository _brandReadRepository;

        public GetBrandsByCategoryNameQueryHandler(IBrandReadRepository brandReadRepository)
        {
            _brandReadRepository = brandReadRepository;
        }

        public async Task<GetBrandsByCategoryNameQueryResponse> Handle(GetBrandsByCategoryNameQueryRequest request, CancellationToken cancellationToken)
        {
            List<GetBrandsByCategoryNameDto> brands = await _brandReadRepository.GetAll(false)
                                                      .Where(b => b.Category.Name == request.CategoryName)
                                                      .Select(b => new GetBrandsByCategoryNameDto()
                                                      {
                                                          Id = b.Id,
                                                          CategoryId = b.CategoryId,
                                                          Name = b.Name
                                                      })
                                                      .ToListAsync();

            return new()
            {
                Brands = brands
            };
        }
    }
}
