using Application.DTOs.Order;
using Application.Repositories.Orders;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Orders.GetByIdOrder
{
    public class GetByIdOrderQueryHandler : IRequestHandler<GetByIdOrderQueryRequest, GetByIdOrderQueryResponse>
    {
        private readonly IOrderReadRepository _orderReadRepository;
        public GetByIdOrderQueryHandler(IOrderReadRepository orderReadRepository)
        {
            _orderReadRepository = orderReadRepository;
        }
        public async Task<GetByIdOrderQueryResponse> Handle(GetByIdOrderQueryRequest request, CancellationToken cancellationToken)
        {
            var order = await _orderReadRepository
    .Table
    .Include(o => o.OrderItems)
    .FirstOrDefaultAsync(o => o.Id == request.Id);


            return new GetByIdOrderQueryResponse
            {
                Id = order.Id,
                FullName = order.FullName,
                PhoneNumber = order.PhoneNumber,
                Mail = order.Mail,
                City = order.City,
                Location = order.Store,
                AdditionalInfo = order.AdditionalInfo,
                TotalPrice = order.TotalPrice,
                TotalDiscountPrice = order.TotalDiscountPrice,
                OrderItems = order.OrderItems.Select(oi => new OrderItemDto
                {
                    Name = oi.Name,
                    Color = oi.Color,
                    Count = oi.Count,
                    Price = oi.Price,
                    DiscountPrice = oi.DiscountPrice
                }).ToList()
            };
        }
    }
}
