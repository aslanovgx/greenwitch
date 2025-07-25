using Application.Repositories.Shapes;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Shapes.RemoveShape
{
    public class RemoveShapeCommandHandler : IRequestHandler<RemoveShapeCommandRequest, RemoveShapeCommandResponse>
    {
        private readonly IShapeWriteRepository _shapeWriteRepository;
        public RemoveShapeCommandHandler(IShapeWriteRepository shapeWriteRepository)
        {
            _shapeWriteRepository = shapeWriteRepository;
        }
        public async Task<RemoveShapeCommandResponse> Handle(RemoveShapeCommandRequest request, CancellationToken cancellationToken)
        {
            await _shapeWriteRepository.RemoveAsync(request.Id);
            await _shapeWriteRepository.SaveChangesAsync();
            return new();
        }
    }
}
