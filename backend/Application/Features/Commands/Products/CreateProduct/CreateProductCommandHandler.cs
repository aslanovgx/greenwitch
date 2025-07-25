using Application.Features.Commands.Products.CreateProduct;
using Application.Repositories.Colors;
using Application.Repositories.ProductImages;
using Application.Repositories.Products;
using Application.Services;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommandRequest, CreateProductCommandResponse>
{
    private readonly IProductWriteRepository _productWriteRepository;
    private readonly IColorReadRepository _colorReadRepository;
    private readonly IProductImageWriteRepository _productImageWriteRepository;
    private readonly IFileService _fileService;

    public CreateProductCommandHandler(
        IProductWriteRepository productWriteRepository,
        IColorReadRepository colorReadRepository,
        IProductImageWriteRepository productImageWriteRepository,
        IFileService fileService)
    {
        _productWriteRepository = productWriteRepository;
        _colorReadRepository = colorReadRepository;
        _productImageWriteRepository = productImageWriteRepository;
        _fileService = fileService;
    }

    public async Task<CreateProductCommandResponse> Handle(CreateProductCommandRequest request, CancellationToken cancellationToken)
    {
        var product = new Product
        {
            Name = request.Name,
            Description = request.Description,
            Price = request.Price,
            DiscountPrice = request.DiscountPrice,
            BestSeller = request.BestSeller,
            BrandId = request.BrandId,
            Stock = request.Stock,
            CategoryId = request.CategoryId,
            GenderId = request.GenderId,
            ShapeId = request.ShapeId,
            ProductColors = new List<ProductColor>()
        };

        if (request.ColorIds != null && request.ColorIds.Any())
        {
            foreach (var colorId in request.ColorIds)
            {
                product.ProductColors.Add(new ProductColor
                {
                    ColorId = colorId
                });
            }
        }

        // Məhsulu əvvəlcə əlavə edirik ki, Id yaransın
        await _productWriteRepository.AddAsync(product);
        await _productWriteRepository.SaveChangesAsync();

        // İndi şəkilləri yüklə və DB-yə əlavə et
        if (request.Files != null && request.Files.Any())
        {
            var rootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "products");

            var imageEntities = new List<ProductImage>();

            foreach (var file in request.Files)
            {
                var fileName = await _fileService.UploadAsync(file, rootPath);

                imageEntities.Add(new ProductImage
                {
                    ImagePath = Path.Combine("images", "products", fileName).Replace("\\", "/"),
                    ProductId = product.Id // burada artıq Id mövcuddur
                });
            }

            await _productImageWriteRepository.AddRangeAsync(imageEntities);
            await _productImageWriteRepository.SaveChangesAsync();
        }

        return new CreateProductCommandResponse();
    }
}