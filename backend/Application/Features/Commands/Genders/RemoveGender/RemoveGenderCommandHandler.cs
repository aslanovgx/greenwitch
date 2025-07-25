using Application.Repositories.Genders;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Genders.RemoveGender
{
    public class RemoveGenderCommandHandler : IRequestHandler<RemoveGenderCommandRequest, RemoveGenderCommandResponse>
    {
        readonly IGenderWriteRepository _genderWriteRepository;

        public RemoveGenderCommandHandler(IGenderWriteRepository genderWriteRepository)
        {
            _genderWriteRepository = genderWriteRepository;
        }

        public async Task<RemoveGenderCommandResponse> Handle(RemoveGenderCommandRequest request, CancellationToken cancellationToken)
        {
            await _genderWriteRepository.RemoveAsync(request.Id);
            await _genderWriteRepository.SaveChangesAsync();
            return new();
        }
    }
}
