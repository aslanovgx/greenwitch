using Application.DTOs.Product;
using Application.Repositories.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetDiscountedProducts
{
    public class GetDiscountedProductsQueryHandler : IRequestHandler<GetDiscountedProductsQueryRequest, GetDiscountedProductsQueryResponse>
    {
        readonly IProductReadRepository _productReadRepository;

        public GetDiscountedProductsQueryHandler(IProductReadRepository productReadRepository)
        {
            _productReadRepository = productReadRepository;
        }

        public async Task<GetDiscountedProductsQueryResponse> Handle(GetDiscountedProductsQueryRequest request, CancellationToken cancellationToken)
        {
            List<GetDiscountedProductsDto> products = await _productReadRepository.GetAll(false)
                                                      .Where(p => p.DiscountPrice > 0)
                                                      .Skip(request.Page * request.Size)
                                                      .Take(request.Size)
                                                      .Select(p => new GetDiscountedProductsDto()
                                                      {
                                                          Id = p.Id,
                                                          Name = p.Name,
                                                          Price = p.Price,
                                                          BrandName = p.Brand.Name,
                                                          DiscountPrice = p.DiscountPrice
                                                      })
                                                      .ToListAsync();


            // Include istifadə etməyə ehtiyac yoxdur Ef avtomatik join edir

            return new()
            {
                Products = products
            };
        }
    }
}
