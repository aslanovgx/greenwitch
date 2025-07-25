using Application.DTOs.Brand;
using Application.DTOs.Shape;
using Application.Repositories.Brands;
using Application.Repositories.Shapes;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Shapes.GetAllShape
{
    public class GetAllShapeQueryHandler : IRequestHandler<GetAllShapeQueryRequest, GetAllShapeQueryResponse>
    {
        readonly IShapeReadRepository _shapeReadRepository;
        public GetAllShapeQueryHandler(IShapeReadRepository shapeReadRepository)
        {
            _shapeReadRepository = shapeReadRepository;
        }
        public async Task<GetAllShapeQueryResponse> Handle(GetAllShapeQueryRequest request, CancellationToken cancellationToken)
        {
            List<GetListShapeDto> shapes = await _shapeReadRepository.GetAll(false).Select(s => new GetListShapeDto()
            {
                Id = s.Id,
                Name = s.Name
            }).ToListAsync();

            return new()
            {
                Shapes = shapes
            };
        }
    }
}
