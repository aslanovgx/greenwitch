using MediatR;
using System.Collections.Generic;

namespace Application.Features.Commands.Orders.CreateOrder
{
    public class CreateOrderCommandRequest : IRequest<CreateOrderCommandResponse>
    {
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string? Mail { get; set; }
        public string? Store { get; set; }
        public string City { get; set; }
        public string AdditionalInfo { get; set; }
        public List<OrderItemRequest> OrderItems { get; set; }
    }

    public class OrderItemRequest
    {
        public string Name { get; set; }
        public string Color { get; set; }
        public int Count { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountPrice { get; set; }
    }
}
