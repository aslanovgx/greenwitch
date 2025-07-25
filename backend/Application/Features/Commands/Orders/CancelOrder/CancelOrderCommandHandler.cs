using Application.Repositories.Orders;
using Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Orders.CancelOrder
{
    public class CancelOrderCommandHandler : IRequestHandler<CancelOrderCommandRequest, bool>
    {
        private readonly IOrderReadRepository _readRepository;
        private readonly IOrderWriteRepository _writeRepository;
        public CancelOrderCommandHandler(IOrderReadRepository readRepository, IOrderWriteRepository writeRepository)
        {
            _readRepository = readRepository;
            _writeRepository = writeRepository;
        }
        public async Task<bool> Handle(CancelOrderCommandRequest request, CancellationToken cancellationToken)
        {
            var order = await _readRepository.GetByIdAsync(request.OrderId);
            if (order == null) return false;
            order.Status=OrderStatus.Canceled;
            await _writeRepository.SaveChangesAsync();
            return true;
        }
    }
}
