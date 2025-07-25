using Application.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Orders.GetByIdOrder
{
    public class GetByIdOrderQueryResponse
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Mail { get; set; }
        public string City { get; set; }
        public string Location { get; set; }
        public string AdditionalInfo { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal TotalDiscountPrice { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
    }
}
