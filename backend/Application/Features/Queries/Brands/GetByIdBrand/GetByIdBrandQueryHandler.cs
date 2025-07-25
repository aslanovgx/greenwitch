using Application.Repositories.Brands;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Brands.GetByIdBrand
{
    public class GetByIdBrandQueryHandler : IRequestHandler<GetByIdBrandQueryRequest, GetByIdBrandQueryResponse>
    {
        readonly IBrandReadRepository _brandReadRepository;

        public GetByIdBrandQueryHandler(IBrandReadRepository brandReadRepository)
        {
            _brandReadRepository = brandReadRepository;
        }

        public async Task<GetByIdBrandQueryResponse> Handle(GetByIdBrandQueryRequest request, CancellationToken cancellationToken)
        {
            Brand brand = await _brandReadRepository.GetByIdAsync(request.Id);
            return new()
            {
                Id = brand.Id,
                Name = brand.Name
            };
        }
    }
}
