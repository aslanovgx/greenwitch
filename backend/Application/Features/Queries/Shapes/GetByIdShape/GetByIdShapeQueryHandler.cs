using Application.Features.Queries.Brands.GetByIdBrand;
using Application.Repositories.Brands;
using Application.Repositories.Shapes;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Shapes.GetByIdShape
{
    public class GetByIdShapeQueryHandler : IRequestHandler<GetByIdShapeQueryRequest, GetByIdShapeQueryResponse>
    {
        private readonly IShapeReadRepository _shapeReadRepository;
        public GetByIdShapeQueryHandler(IShapeReadRepository shapeReadRepository)
        {
            _shapeReadRepository = shapeReadRepository;
        }
        public async Task<GetByIdShapeQueryResponse> Handle(GetByIdShapeQueryRequest request, CancellationToken cancellationToken)
        {
            Shape shape = await _shapeReadRepository.GetByIdAsync(request.Id);
            return new()
            {
                Id = shape.Id,
                Name = shape.Name
            };
        }
    }
}
