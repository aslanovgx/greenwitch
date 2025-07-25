using Application.DTOs.Product;
using Application.Repositories.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetBestSellerProducts
{
    public class GetBestSellerProductsQueryHandler : IRequestHandler<GetBestSellerProductsQueryRequest, GetBestSellerProductsQueryResponse>
    {
        readonly IProductReadRepository _productReadRepository;

        public GetBestSellerProductsQueryHandler(IProductReadRepository productReadRepository)
        {
            _productReadRepository = productReadRepository;
        }

        public async Task<GetBestSellerProductsQueryResponse> Handle(GetBestSellerProductsQueryRequest request, CancellationToken cancellationToken)
        {
            List<GetBestSellerProductsDto> products = await _productReadRepository.GetAll(false)
                                                      .Where(p => p.BestSeller)
                                                      .Skip(request.Page * request.Size)
                                                      .Take(request.Size)
                                                      .Select(p => new GetBestSellerProductsDto
                                                      {
                                                          Id = p.Id,
                                                          Name = p.Name,
                                                          Price = p.Price,
                                                          BrandName = p.Brand.Name 
                                                    })
                                                    
                                                    .ToListAsync();
            // // Include istifadə etməyə ehtiyac yoxdur Ef avtomatik join edir
            return new()
            {
                Products = products
            };
        }
    }
}
