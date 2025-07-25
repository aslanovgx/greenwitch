using Application.Repositories.Products;
using Application.Repositories.Shapes;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Shapes.CreateShape
{
    public class CreateShapeCommandHandler : IRequestHandler<CreateShapeCommandRequest, CreateShapeCommandResponse>
    {
        readonly IShapeWriteRepository _shapeWriteRepository;
        public CreateShapeCommandHandler(IShapeWriteRepository shapeWriteRepository )
        {
            _shapeWriteRepository = shapeWriteRepository;
        }
        public async Task<CreateShapeCommandResponse> Handle(CreateShapeCommandRequest request, CancellationToken cancellationToken)
        {
            await _shapeWriteRepository.AddAsync(new Shape()
            {
                Name = request.Name
            });
            await _shapeWriteRepository.SaveChangesAsync();
            return new();
        }
    }
}
