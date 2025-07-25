using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.ProductImages.CreateProductImage
{
    public class CreateProductImageCommandRequest : IRequest<CreateProductImageCommandResponse>
    {
        public int ProductId { get; set; }
        public IFormFileCollection Files { get; set; }
    }
}
