using Application.DTOs.Gender;
using Application.DTOs.Shape;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Shapes.GetAllShape
{
    public class GetAllShapeQueryResponse 
    {
        public List<GetListShapeDto> Shapes { get; set; }
    }
}
