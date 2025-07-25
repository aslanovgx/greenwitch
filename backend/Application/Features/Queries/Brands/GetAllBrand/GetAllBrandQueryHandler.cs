using Application.DTOs.Brand;
using Application.Repositories.Brands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Brands.GetAllBrand
{
    public class GetAllBrandQueryHandler : IRequestHandler<GetAllBrandQueryRequest, GetAllBrandQueryResponse>
    {
        readonly IBrandReadRepository _brandReadRepository;

        public GetAllBrandQueryHandler(IBrandReadRepository brandReadRepository)
        {
            _brandReadRepository = brandReadRepository;
        }

        public async Task<GetAllBrandQueryResponse> Handle(GetAllBrandQueryRequest request, CancellationToken cancellationToken)
        {
            List<GetListBrandDto> brands = await _brandReadRepository.GetAll(false).Select(b=> new GetListBrandDto()
            {
                Id = b.Id,
                CategoryId = b.CategoryId,
                Name = b.Name
            }).ToListAsync();

            return new()
            {
                Brands = brands
            };
        }
    }
}
