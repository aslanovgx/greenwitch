using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Features.Commands.ProductImages.UpdateProductImage
{
    public class UpdateProductImageCommandRequest : IRequest<UpdateProductImageCommandResponse>
    {
        public int ProductId { get; set; }

        public List<IFormFile> Files { get; set; }
    }
}
