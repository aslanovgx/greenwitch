using Application.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Orders.GetAllOrder
{
    public class GetAllOrderQueryResponse
    {
        public List<GetListOrderDto> Orders { get; set; }
    }
}
