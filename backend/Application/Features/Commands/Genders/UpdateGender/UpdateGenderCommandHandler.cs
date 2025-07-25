using Application.Repositories.Genders;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Genders.UpdateGender
{
    public class UpdateGenderCommandHandler : IRequestHandler<UpdateGenderCommandRequest, UpdateGenderCommandResponse>
    {
        readonly IGenderWriteRepository _genderWriteRepository;
        readonly IGenderReadRepository _genderReadRepository;

        public UpdateGenderCommandHandler(IGenderWriteRepository genderWriteRepository, IGenderReadRepository genderReadRepository)
        {
            _genderWriteRepository = genderWriteRepository;
            _genderReadRepository = genderReadRepository;
        }

        public async Task<UpdateGenderCommandResponse> Handle(UpdateGenderCommandRequest request, CancellationToken cancellationToken)
        {
            Gender gender = await _genderReadRepository.GetByIdAsync(request.Id);
            gender.Name = request.Name;
            await _genderWriteRepository.SaveChangesAsync();
            return new();
        }
    }
}
