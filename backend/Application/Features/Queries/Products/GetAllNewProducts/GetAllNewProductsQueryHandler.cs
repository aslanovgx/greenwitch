using Application.DTOs.Product;
using Application.Repositories.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetAllNewProducts
{
    public class GetAllNewProductsQueryHandler : IRequestHandler<GetAllNewProductsQueryRequest, GetAllNewProductsQueryResponse>
    {
        readonly IProductReadRepository _productReadRepository;

        public GetAllNewProductsQueryHandler(IProductReadRepository productReadRepository)
        {
            _productReadRepository = productReadRepository;
        }

        public async Task<GetAllNewProductsQueryResponse> Handle(GetAllNewProductsQueryRequest request, CancellationToken cancellationToken)
        {
            var oneHourAgo = DateTime.Now.AddHours(-1);
            List<GetAllNewProductsDto> products = await _productReadRepository.GetAll(false)
                                                  .Where(p=>p.CreatedDate >= oneHourAgo)
                                                  .Skip(request.Page * request.Size)
                                                  .Take(request.Size)
                                                  .Select(p=> new GetAllNewProductsDto()
                                                  {
                                                      BrandName = p.Brand.Name,
                                                      Id = p.Id,
                                                      Name = p.Name,
                                                      Price = p.Price,
                                                  }).ToListAsync();

            // Include istifadə etməyə ehtiyac yoxdur Ef avtomatik join edir
            return new()
            {
                Products = products
            };
        }
    }
}
