using Application.Repositories.Colors;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Colors.UpdateColor
{
    public class UpdateColorCommandHandler : IRequestHandler<UpdateColorCommandRequest, UpdateColorCommandResponse>
    {
        readonly IColorWriteRepository _colorWriteRepository;
        readonly IColorReadRepository _colorReadRepository;

        public UpdateColorCommandHandler(IColorWriteRepository colorWriteRepository, IColorReadRepository colorReadRepository)
        {
            _colorWriteRepository = colorWriteRepository;
            _colorReadRepository = colorReadRepository;
        }

        public async Task<UpdateColorCommandResponse> Handle(UpdateColorCommandRequest request, CancellationToken cancellationToken)
        {
            Color color = await _colorReadRepository.GetByIdAsync(request.Id);
            color.Name = request.Name;
            await _colorWriteRepository.SaveChangesAsync();
            return new();
        }
    }
}
