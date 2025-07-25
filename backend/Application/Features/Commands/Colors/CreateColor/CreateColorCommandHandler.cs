using Application.Repositories.Colors;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Colors.CreateColor
{
    public class CreateColorCommandHandler : IRequestHandler<CreateColorCommandRequest, CreateColorCommandResponse>
    {
        readonly IColorWriteRepository _colorWriteRepository;

        public CreateColorCommandHandler(IColorWriteRepository colorWriteRepository)
        {
            _colorWriteRepository = colorWriteRepository;
        }

        public async Task<CreateColorCommandResponse> Handle(CreateColorCommandRequest request, CancellationToken cancellationToken)
        {
            await _colorWriteRepository.AddAsync(new Color
            {
                Name = request.Name,
            });
            await _colorWriteRepository.SaveChangesAsync();
            return new();
        }
    }
}
