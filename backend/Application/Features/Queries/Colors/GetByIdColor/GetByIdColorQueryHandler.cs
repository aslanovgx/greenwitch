    using Application.Repositories.Categories;
    using Application.Repositories.Colors;
    using Domain.Entities;
    using MediatR;
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Color = Domain.Entities.Color;

    namespace Application.Features.Queries.Colors.GetByIdColor
    {

        public class GetByIdColorQueryHandler : IRequestHandler<GetByIdColorQueryRequest, GetByIdColorQueryResponse>
        {
            readonly IColorReadRepository _colorReadRepository;
            public GetByIdColorQueryHandler(IColorReadRepository colorReadRepository)
            {
                _colorReadRepository = colorReadRepository;
            }

            public async Task<GetByIdColorQueryResponse> Handle(GetByIdColorQueryRequest request, CancellationToken cancellationToken)
            {
                Color color = await _colorReadRepository.GetByIdAsync(request.Id);
                return new()
                {
                    Id = color.Id,
                    Name = color.Name
                };
            }
        }
    }
