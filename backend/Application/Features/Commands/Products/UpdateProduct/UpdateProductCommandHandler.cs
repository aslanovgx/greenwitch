using Application.Features.Commands.Products.UpdateProduct;
using Application.Repositories.Products;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommandRequest, UpdateProductCommandResponse>
{
    private readonly IProductWriteRepository _productWriteRepository;
    private readonly IProductReadRepository _productReadRepository;

    public UpdateProductCommandHandler(IProductWriteRepository productWriteRepository, IProductReadRepository productReadRepository)
    {
        _productWriteRepository = productWriteRepository;
        _productReadRepository = productReadRepository;
    }

    public async Task<UpdateProductCommandResponse> Handle(UpdateProductCommandRequest request, CancellationToken cancellationToken)
    {
        Product product = await _productReadRepository
     .GetWhere(p => p.Id == request.Id)
     .Include(p => p.ProductColors)
     .Include(p => p.ProductImages)
     .FirstOrDefaultAsync();

        if (product == null)
            throw new Exception("Product tapılmadı.");

        // Əsas sahələr
        product.Name = request.Name;
        product.Description = request.Description;
        product.Price = request.Price;
        product.DiscountPrice = request.DiscountPrice;
        product.BestSeller = request.BestSeller;
        product.BrandId = request.BrandId;
        product.Stock = request.Stock;
        product.CategoryId = request.CategoryId;
        product.GenderId = request.GenderId;
        product.ShapeId = request.ShapeId;

        // Rəngləri sil və yenidən əlavə et
        product.ProductColors.Clear();
        if (request.ColorIds != null && request.ColorIds.Any())
        {
            foreach (var colorId in request.ColorIds)
            {
                product.ProductColors.Add(new ProductColor
                {
                    ColorId = colorId,
                    ProductId = product.Id
                });
            }
        }

       
        await _productWriteRepository.SaveChangesAsync();
        return new UpdateProductCommandResponse();
    }
}
