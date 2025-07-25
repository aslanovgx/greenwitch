using Application.Repositories.Colors;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Colors.RemoveColor
{
    public class RemoveColorCommandHandler : IRequestHandler<RemoveColorCommandRequest, RemoveColorCommandResponse>
    {
        readonly IColorWriteRepository _colorWriteRepository;

        public RemoveColorCommandHandler(IColorWriteRepository colorWriteRepository)
        {
            _colorWriteRepository = colorWriteRepository;
        }

        public async Task<RemoveColorCommandResponse> Handle(RemoveColorCommandRequest request, CancellationToken cancellationToken)
        {
            await _colorWriteRepository.RemoveAsync(request.Id);
            await _colorWriteRepository.SaveChangesAsync();
            return new();
        }
    }
}
