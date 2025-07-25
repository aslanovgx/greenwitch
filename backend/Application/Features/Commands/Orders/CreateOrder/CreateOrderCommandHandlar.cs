using Application.Repositories.Orders;
using Application.Services;
using Domain.Entities;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Commands.Orders.CreateOrder
{
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommandRequest, CreateOrderCommandResponse>
    {
        private readonly IOrderWriteRepository _orderWriteRepository;
        private readonly INotificationService _notificationService;

        public CreateOrderCommandHandler(IOrderWriteRepository orderWriteRepository, INotificationService notificationService)
        {
            _orderWriteRepository = orderWriteRepository;
            _notificationService = notificationService;
        }

        public async Task<CreateOrderCommandResponse> Handle(CreateOrderCommandRequest request, CancellationToken cancellationToken)
        {
            var order = new Order
            {
                FullName = request.FullName,
                PhoneNumber = request.PhoneNumber,
                Mail = request.Mail,
                Store = request.Store,
                City = request.City,
                AdditionalInfo = request.AdditionalInfo,
                OrderItems = request.OrderItems.Select(x => new OrderItem
                {
                    Name = x.Name,
                    Color = x.Color,
                    Count = x.Count,
                    Price = x.Price,
                    DiscountPrice = x.DiscountPrice
                }).ToList()
            };

            await _orderWriteRepository.AddAsync(order);
            await _orderWriteRepository.SaveChangesAsync();
            _notificationService.Add($"{order.FullName} adlı müştəridən sifariş aldınız.");

            return new CreateOrderCommandResponse
            {
                OrderId = order.Id,
                Message = "Sifariş uğurla yaradıldı."
            };
        }
    }
}
