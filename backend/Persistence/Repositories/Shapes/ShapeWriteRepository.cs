using Application.Repositories;
using Application.Repositories.Shapes;
using Domain.Entities;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories.Shapes
{
    public class ShapeWriteRepository : WriteRepository<Shape>, IShapeWriteRepository
    {
        public ShapeWriteRepository(SaatDbContext context) : base(context)
        {
        }
    }
}
