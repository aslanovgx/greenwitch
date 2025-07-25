using Application.DTOs.Color;
using Application.DTOs.Gender;
using Application.Features.Queries.Genders.GetAllGender;
using Application.Repositories.Colors;
using Application.Repositories.Genders;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Colors.GetAllColor
{
    public class GetAllColorQueryHandler : IRequestHandler<GetAllColorQueryRequest,GetAllColorQueryResponse>
    {
        private readonly IColorReadRepository _colorReadRepository;
        public GetAllColorQueryHandler(IColorReadRepository colorReadRepository)
        {
            _colorReadRepository = colorReadRepository;
        }
        public async Task<GetAllColorQueryResponse> Handle(GetAllColorQueryRequest request, CancellationToken cancellationToken) 
        {
            List<GetListColorDto> colors = await _colorReadRepository.GetAll(false).Select(c => new GetListColorDto
            {
                Id = c.Id,
                Name = c.Name
            }).ToListAsync();

            return new()
            {
                Colors = colors
            };
        }
    }
}
