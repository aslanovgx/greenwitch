using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repositories.OrderItems
{
    public interface IOrderItemWriteRepository : IWriteRepository<OrderItem>
    {
    }
}
