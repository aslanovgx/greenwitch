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
    public class ShapeReadRepository : ReadRepository<Shape>, IShapeReadRepository
    {
        public ShapeReadRepository(SaatDbContext context) : base(context)
        {
        }
    }
}
