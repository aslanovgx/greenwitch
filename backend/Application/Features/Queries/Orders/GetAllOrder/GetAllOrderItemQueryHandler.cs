using Application.DTOs.Order;
using Application.Repositories.Orders;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.Orders.GetAllOrder
{
    public class GetAllOrderQueryHandler : IRequestHandler<GetAllOrderQueryRequest, GetAllOrderQueryResponse>
    {
        private readonly IOrderReadRepository _orderReadRepository;

        public GetAllOrderQueryHandler(IOrderReadRepository orderReadRepository)
        {
            _orderReadRepository = orderReadRepository;
        }

        public async Task<GetAllOrderQueryResponse> Handle(GetAllOrderQueryRequest request, CancellationToken cancellationToken)
        {
            var orders = await _orderReadRepository
              .GetAll()
              .Include(x => x.OrderItems)
              .ToListAsync(cancellationToken);


            var response = new GetAllOrderQueryResponse
            {
                Orders = orders.Select(o => new GetListOrderDto
                {
                    Id = o.Id,
                    FullName = o.FullName,
                    PhoneNumber = o.PhoneNumber,
                    City = o.City,
                    Location  = o.Store ,
                    AdditionalInfo = o.AdditionalInfo,
                    TotalPrice = o.TotalPrice,
                    TotalDiscountPrice = o.TotalDiscountPrice,
                    OrderItems = o.OrderItems.Select(i => new OrderItemDto
                    {
                        Name = i.Name,
                        Color = i.Color,
                        Count = i.Count,
                        Price = i.Price,
                        DiscountPrice = i.DiscountPrice,
                        TotalPrice = i.TotalPrice,
                        TotalDiscountPrice = i.TotalDiscountPrice
                    }).ToList()
                }).ToList()
            };

            return response;
        }
    }
}
