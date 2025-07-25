using Application.Features.Commands.ProductImages.RemoveProductImage;
using Application.Repositories.ProductImages;
using Application.Services;
using MediatR;

namespace Application.Features.Commands.ProductImages.DeleteProductImage
{
    public class RemoveProductImageCommandHandler : IRequestHandler<RemoveProductImageCommandRequest, RemoveProductImageCommandResponse>
    {
        private readonly IProductImageReadRepository _productImageReadRepository;
        private readonly IProductImageWriteRepository _productImageWriteRepository;
        private readonly IFileService _fileService;

        public RemoveProductImageCommandHandler(
            IProductImageReadRepository productImageReadRepository,
            IProductImageWriteRepository productImageWriteRepository,
            IFileService fileService)
        {
            _productImageReadRepository = productImageReadRepository;
            _productImageWriteRepository = productImageWriteRepository;
            _fileService = fileService;
        }

        public async Task<RemoveProductImageCommandResponse> Handle(RemoveProductImageCommandRequest request, CancellationToken cancellationToken)
        {
            var image = await _productImageReadRepository.GetByIdAsync(request.Id);

           

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", image.ImagePath);

            await _fileService.DeleteAsync(filePath);

            _productImageWriteRepository.Remove(image);
            await _productImageWriteRepository.SaveChangesAsync();

            return new();
        }
    }
}
