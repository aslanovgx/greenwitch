using Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Brand : BaseEntity
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public Category Category { get; set; }
        public ICollection<Product> Products { get; set; }


    }

}
