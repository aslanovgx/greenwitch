using Application.DTOs.Product;
using Application.Repositories.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetAllProductWithAll
{
    public class GetAllProductWithAllQueryHandler : IRequestHandler<GetAllProductWithAllQueryRequest, GetAllProductWithAllQueryResponse>
    {
        readonly IProductReadRepository _productReadRepository;

        public GetAllProductWithAllQueryHandler(IProductReadRepository productReadRepository)
        {
            _productReadRepository = productReadRepository;
        }

        async Task<GetAllProductWithAllQueryResponse> IRequestHandler<GetAllProductWithAllQueryRequest, GetAllProductWithAllQueryResponse>.Handle(GetAllProductWithAllQueryRequest request, CancellationToken cancellationToken)
        {
            var query = _productReadRepository.GetAll(false);

            // Əgər CategoryId verilmişsə filter tətbiq et
            if (request.CategoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == request.CategoryId.Value);
            }

            var totalCount = await query.CountAsync();

            var totalPages = (int)System.Math.Ceiling((double)totalCount / request.Size);

            var products = await query
                .Skip(request.Page * request.Size)
                .Take(request.Size)
                .Select(p => new GetAllProductWithAllDto
                {
                    BestSeller = p.BestSeller,
                    BrandId = p.BrandId,
                    BrandName = p.Brand.Name,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    Description = p.Description,
                    GenderId = p.GenderId,
                    GenderName = p.Gender.Name,
                    Id = p.Id,
                    Name = p.Name,
                    DiscountPrice = p.DiscountPrice,
                    Price = p.Price,
                    Stock = p.Stock,
                    ShapeName = p.Shape.Name,
                    ColorNames = p.ProductColors.Select(pc => pc.Color.Name).ToList(),
                    Images = p.ProductImages.Select(pi => pi.ImagePath).ToList()
                })
                .ToListAsync();

            return new GetAllProductWithAllQueryResponse
            {
                Products = products,
                TotalCount = totalCount,
                TotalPages = totalPages
            };
        }
    }
}
