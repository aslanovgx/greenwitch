using Application.DTOs.Gender;
using Application.Repositories.Genders;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Genders.GetAllGender
{
    public class GetAllGenderQueryHandler : IRequestHandler<GetAllGenderQueryRequest, GetAllGenderQueryResponse>
    {
        readonly IGenderReadRepository _genderReadRepository;

        public GetAllGenderQueryHandler(IGenderReadRepository genderReadRepository)
        {
            _genderReadRepository = genderReadRepository;
        }

        public async Task<GetAllGenderQueryResponse> Handle(GetAllGenderQueryRequest request, CancellationToken cancellationToken)
        {
            List<GetListGenderDto> genders = await _genderReadRepository.GetAll(false).Select(g => new GetListGenderDto
            {
               Id = g.Id,
               Name = g.Name
            }).ToListAsync();

            return new()
            {
                Genders = genders
            };
        }
    }
}
