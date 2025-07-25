using Application.Repositories.ProductImages;
using Application.Services;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.ProductImages.CreateProductImage
{
    public class CreateProductImageCommandHandler : IRequestHandler<CreateProductImageCommandRequest, CreateProductImageCommandResponse>
    {
        readonly IProductImageWriteRepository _productImageWriteRepository;
        readonly IFileService _fileService;

        public CreateProductImageCommandHandler(IProductImageWriteRepository productImageWriteRepository, IFileService fileService)
        {
            _productImageWriteRepository = productImageWriteRepository;
            _fileService = fileService;
        }

        public async Task<CreateProductImageCommandResponse> Handle(CreateProductImageCommandRequest request, CancellationToken cancellationToken)
        {
            var rootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "products");

            var imageEntities = new List<ProductImage>();

            foreach (var file in request.Files)
            {
                var fileName = await _fileService.UploadAsync(file, rootPath);

                imageEntities.Add(new ProductImage
                {
                    ImagePath = Path.Combine("images", "products", fileName).Replace("\\", "/"),
                    ProductId = request.ProductId // bu property request-də olmalıdır
                });
            }

            await _productImageWriteRepository.AddRangeAsync(imageEntities);
            await _productImageWriteRepository.SaveChangesAsync();

            return new();
        }
    }
}
