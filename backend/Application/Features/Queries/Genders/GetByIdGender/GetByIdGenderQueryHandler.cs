using Application.DTOs.Gender;
using Application.Repositories.Genders;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Genders.GetByIdGender
{
    public class GetByIdGenderQueryHandler : IRequestHandler<GetByIdGenderQueryRequest, GetByIdGenderQueryResponse>
    {
        readonly IGenderReadRepository _genderReadRepository;

        public GetByIdGenderQueryHandler(IGenderReadRepository genderReadRepository)
        {
            _genderReadRepository = genderReadRepository;
        }

        public async Task<GetByIdGenderQueryResponse> Handle(GetByIdGenderQueryRequest request, CancellationToken cancellationToken)
        {
            Gender gender = await _genderReadRepository.GetByIdAsync(request.Id);
            return new()
            {
                Id = gender.Id,
                Name = gender.Name
            };
        }
    }
}
