using Application.Features.Commands.ProductImages.UpdateProductImage;
using Application.Repositories.ProductImages;
using Application.Services;
using MediatR;

public class UpdateProductImageCommandHandler : IRequestHandler<UpdateProductImageCommandRequest, UpdateProductImageCommandResponse>
{
    private readonly IProductImageReadRepository _readRepository;
    private readonly IProductImageWriteRepository _writeRepository;
    private readonly IFileService _fileService;

    public UpdateProductImageCommandHandler(
        IProductImageReadRepository readRepository,
        IProductImageWriteRepository writeRepository,
        IFileService fileService)
    {
        _readRepository = readRepository;
        _writeRepository = writeRepository;
        _fileService = fileService;
    }

    public async Task<UpdateProductImageCommandResponse> Handle(UpdateProductImageCommandRequest request, CancellationToken cancellationToken)
    {
        var rootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "products");

        // 1. Köhnə şəkilləri tap və sil
        var oldImages = _readRepository.GetWhere(x => x.ProductId == request.ProductId).ToList();
        foreach (var image in oldImages)
        {
            var fullPath = Path.Combine(rootPath, Path.GetFileName(image.ImagePath));
            _fileService.DeleteAsync(fullPath);
            _writeRepository.Remove(image);
        }

        // 2. Yeni şəkilləri əlavə et
        foreach (var file in request.Files)
        {
            var newFileName = await _fileService.UploadAsync(file, rootPath);
            var newImage = new Domain.Entities.ProductImage
            {
                ProductId = request.ProductId,
                ImagePath = Path.Combine("images", "products", newFileName).Replace("\\", "/")
            };
            await _writeRepository.AddAsync(newImage);
        }

        await _writeRepository.SaveChangesAsync();
        return new();
    }
}