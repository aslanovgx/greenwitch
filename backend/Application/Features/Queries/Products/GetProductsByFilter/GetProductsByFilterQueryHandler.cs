using Application.DTOs.Product;
using Application.Features.Queries.Products.GetAllProductWithAll;
using Application.Repositories.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Products.GetProductsByFilter
{
    public class GetProductsByFilterQueryHandler : IRequestHandler<GetProductsByFilterQueryRequest, GetAllProductWithAllQueryResponse>
    {
        readonly IProductReadRepository _productReadRepository;
        public GetProductsByFilterQueryHandler(IProductReadRepository productReadRepository)
        {
            _productReadRepository = productReadRepository;
        }
        public async Task<GetAllProductWithAllQueryResponse> Handle(GetProductsByFilterQueryRequest request, CancellationToken cancellationToken)
        {
            var query = _productReadRepository.GetAll(false)
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .Include(p => p.Gender)
                .Include(p => p.Shape)
                .Include(p => p.ProductImages)
                .Include(p => p.ProductColors).ThenInclude(pc => pc.Color)
                .AsQueryable();

            // Filter Gender
            if (request.GenderId.HasValue)
                query = query.Where(p => p.GenderId == request.GenderId.Value);

            // Filter Brand
            if (request.BrandId.HasValue)
                query = query.Where(p => p.BrandId == request.BrandId.Value);

            // Filter Shape
            if (request.ShapeId.HasValue)
                query = query.Where(p => p.ShapeId == request.ShapeId.Value);

            if (request.CategoryId.HasValue)
                query = query.Where(p => p.CategoryId == request.CategoryId.Value);


            // Filter Colors (məhsulun rənglərindən ən azı biri seçilən rənglərdədirsə)
            if (request.ColorIds != null && request.ColorIds.Any())
            {
                query = query.Where(p => p.ProductColors.Any(pc => request.ColorIds.Contains(pc.ColorId)));
            }


            // Pagination: Skip və Take
            query = query.Skip(request.Page * request.Size).Take(request.Size);

            // Select lazımi dataları DTO formatında seçirik
            var products = await query.Select(p => new GetAllProductWithAllDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                DiscountPrice = p.DiscountPrice,
                BestSeller = p.BestSeller,
                Stock = p.Stock,
                GenderId = p.GenderId,
                GenderName = p.Gender != null ? p.Gender.Name : null,
                CategoryId = p.CategoryId,
                CategoryName = p.Category != null ? p.Category.Name : null,
                BrandId = p.BrandId,
                BrandName = p.Brand != null ? p.Brand.Name : null,
                ShapeId = p.ShapeId,
                ShapeName = p.Shape != null ? p.Shape.Name : null,
                ColorNames = p.ProductColors.Select(pc => pc.Color.Name).ToList(),
                Images = p.ProductImages.Select(pi => pi.ImagePath).ToList()
            }).ToListAsync(cancellationToken);

            return new GetAllProductWithAllQueryResponse
            {
                Products = products
            };
        }

    }
}
