using Application.Features.Commands.Orders.ApproveOrder;
using Application.Features.Commands.Orders.CancelOrder;
using Application.Repositories.Orders;
using Application.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Printing;
using WebUI.Models;



namespace WebUI.Controllers
{
    [Authorize]
    public class OrderController : Controller
    {

        private readonly IOrderReadRepository _orderReadRepository;
        private readonly IMediator _mediator;
        private const int PageSize = 5;
        public OrderController(IOrderReadRepository orderReadRepository, IMediator mediator)
        {
            _orderReadRepository = orderReadRepository;
            _mediator = mediator;
        }

        public async Task<IActionResult> Index(int page = 1)
        {
            var totalOrders = await _orderReadRepository.GetAll().CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalOrders / PageSize);

            var orders = await _orderReadRepository
                .GetAll()
                .OrderByDescending(o => o.CreatedDate)
                .Skip((page - 1) * PageSize)
                .Take(PageSize)
                .Include(o => o.OrderItems)
                .ToListAsync();

            var viewModel = new OrderListViewModel
            {
                Orders = orders,
                CurrentPage = page,
                TotalPages = totalPages
            };

            return View(viewModel);
        }
        [HttpPost]
        public async Task<IActionResult> ApproveOrder(int id)
        {
            await _mediator.Send(new ApproveOrderCommandRequest { OrderId = id });
            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> CancelOrder(int id)
        {
            await _mediator.Send(new CancelOrderCommandRequest { OrderId = id });
            return RedirectToAction("Index");
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var notifications = _orderReadRepository
                .GetAll()
                .OrderByDescending(o => o.CreatedDate)
                .Take(3)
                .Select(o => $"{o.FullName} adlı müştəridən yeni sifariş.")
                .ToList();

            ViewBag.Notifications = notifications;
            ViewBag.NotificationCount = notifications.Count;

            base.OnActionExecuting(context);
        }

    }
}
