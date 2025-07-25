using Application.Repositories.OrderItems;
using Domain.Entities;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories.OrderItems
{
    public class OrderItemWriteRepository : WriteRepository<OrderItem>, IOrderItemWriteRepository
    {
        public OrderItemWriteRepository(SaatDbContext context) : base(context)
        {
        }
    }
}
