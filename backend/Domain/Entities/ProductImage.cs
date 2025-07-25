using Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ProductImage : BaseEntity
    {
        public string ImagePath { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
