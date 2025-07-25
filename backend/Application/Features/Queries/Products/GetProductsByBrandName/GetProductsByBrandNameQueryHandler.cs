using Application.DTOs.Product;
using Application.Repositories.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetProductsByBrandName
{
    public class GetProductsByBrandNameQueryHandler : IRequestHandler<GetProductsByBrandNameQueryRequest, GetProductsByBrandNameQueryResponse>
    {
        readonly IProductReadRepository _productReadRepository;

        public GetProductsByBrandNameQueryHandler(IProductReadRepository productReadRepository)
        {
            _productReadRepository = productReadRepository;
        }

        public async Task<GetProductsByBrandNameQueryResponse> Handle(GetProductsByBrandNameQueryRequest request, CancellationToken cancellationToken)
        {
            List<GetProductsByBrandNameDto> products = await _productReadRepository.GetAll(false)
                                                       .Where(p => p.Brand.Name == request.BrandName)
                                                       .Select(p => new GetProductsByBrandNameDto()
                                                       {
                                                           BrandId = p.BrandId,
                                                           Id = p.Id,
                                                           Name = p.Name
                                                       })
                                                       .ToListAsync();

            return new()
            {
                Products = products
            };
        }
    }
}
