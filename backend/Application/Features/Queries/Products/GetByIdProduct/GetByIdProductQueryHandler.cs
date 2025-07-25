using Application.Repositories.Products;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetByIdProduct
{
    public class GetByIdProductQueryHandler : IRequestHandler<GetByIdProductQueryRequest, GetByIdProductQueryResponse>
    {
        readonly IProductReadRepository _productReadRepository;

        public GetByIdProductQueryHandler(IProductReadRepository productReadRepository)
        {
            _productReadRepository = productReadRepository;
        }

        public async Task<GetByIdProductQueryResponse> Handle(GetByIdProductQueryRequest request, CancellationToken cancellationToken)
        {
            Product product = await _productReadRepository.GetByIdAsync(request.Id);
            return new()
            {
                BestSeller = product.BestSeller,
                BrandId = product.BrandId,
                CategoryId = product.CategoryId,
                Description = product.Description,
                GenderId = product.GenderId,
                Id = product.Id,
                Stock = product.Stock,
                OldPrice = product.DiscountPrice,
                Name = product.Name,
                Price = product.Price
            };
        }
    }
}
