using Application.DTOs.Product;
using Application.Repositories.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetAllProduct
{
    public class GetAllProductQueryHandler : IRequestHandler<GetAllProductQueryRequest, GetAllProductQueryResponse>
    {
        private readonly IProductReadRepository _productReadRepository;

        public GetAllProductQueryHandler(IProductReadRepository productReadRepository)
        {
            _productReadRepository = productReadRepository;
        }

        public async Task<GetAllProductQueryResponse> Handle(GetAllProductQueryRequest request, CancellationToken cancellationToken)
        {
            var products = await _productReadRepository
                .Table 
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .Include(p => p.Gender)
                .Include(p => p.Shape)
                .Include(p => p.ProductColors)
                    .ThenInclude(pc => pc.Color)
                .Skip(request.Page * request.Size)
                .Take(request.Size)
               .Select(p => new GetListProductDto
               {
                   Id = p.Id,
                   Name = p.Name,
                   Description = p.Description,
                   Price = p.Price,
                   DiscountPrice = p.DiscountPrice,
                   Stock = p.Stock,
                   BestSeller = p.BestSeller,
                   BrandName = p.Brand.Name,
                   CategoryName = p.Category.Name,
                   GenderName = p.Gender.Name,
                   ShapeName = p.Shape.Name,
                   ColorNames = p.ProductColors
                   .Select(pc => pc.Color.Name)
                   .ToList()
               })

                .ToListAsync(cancellationToken);

            return new GetAllProductQueryResponse
            {
                Products = products
            };
        }

    }
}
