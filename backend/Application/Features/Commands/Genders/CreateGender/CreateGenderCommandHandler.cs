using Application.Repositories.Genders;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Genders.CreateGender
{
    public class CreateGenderCommandHandler : IRequestHandler<CreateGenderCommandRequest, CreateGenderCommandResponse>
    {
        readonly IGenderWriteRepository _genderWriteRepository;

        public CreateGenderCommandHandler(IGenderWriteRepository genderWriteRepository)
        {
            _genderWriteRepository = genderWriteRepository;
        }

        public async Task<CreateGenderCommandResponse> Handle(CreateGenderCommandRequest request, CancellationToken cancellationToken)
        {
            await _genderWriteRepository.AddAsync(new Gender()
            {
                Name = request.Name
            });
            await _genderWriteRepository.SaveChangesAsync();
            return new()
            {
                Success = true,
                Message = "Əlavə olundu"
            };
        }
    }
}
