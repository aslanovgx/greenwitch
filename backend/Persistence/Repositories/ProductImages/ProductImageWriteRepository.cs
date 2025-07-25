using Application.Repositories.ProductImages;
using Domain.Entities;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories.ProductImages
{
    public class ProductImageWriteRepository : WriteRepository<ProductImage>, IProductImageWriteRepository
    {
        public ProductImageWriteRepository(SaatDbContext context) : base(context)
        {
        }
    }
}
