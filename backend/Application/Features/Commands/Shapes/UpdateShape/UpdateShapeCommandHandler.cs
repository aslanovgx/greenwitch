using Application.Repositories.Shapes;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Shapes.UpdateShape
{
    public class UpdateShapeCommandHandler : IRequestHandler<UpdateShapeCommandRequest, UpdateShapeCommandResponse>
    {
        private readonly IShapeWriteRepository _shapeWriteRepository;
        private readonly IShapeReadRepository _shapeReadRepository;
        public UpdateShapeCommandHandler(IShapeWriteRepository shapeWriteRepository,IShapeReadRepository shapeReadRepository )
        {
            _shapeWriteRepository = shapeWriteRepository;
            _shapeReadRepository = shapeReadRepository;
        }
        public async Task<UpdateShapeCommandResponse> Handle(UpdateShapeCommandRequest request, CancellationToken cancellationToken)
        {
            Shape shape = await _shapeReadRepository.GetByIdAsync(request.Id);
            shape.Name=request.Name;
            await _shapeWriteRepository.SaveChangesAsync();
            return new();
        }
    }
}
