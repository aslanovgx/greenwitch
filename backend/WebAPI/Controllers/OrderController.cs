using Application.Features.Commands.Brands.CreateBrand;
using Application.Features.Commands.Orders.ApproveOrder;
using Application.Features.Commands.Orders.CancelOrder;
using Application.Features.Commands.Orders.CreateOrder;
using Application.Features.Queries.Genders.GetAllGender;
using Application.Features.Queries.Genders.GetByIdGender;
using Application.Features.Queries.Orders.GetAllOrder;
using Application.Features.Queries.Orders.GetByIdOrder;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        readonly IMediator _mediator;

        public OrderController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllOrders([FromQuery] GetAllOrderQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetByIdOrder([FromRoute] GetByIdOrderQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }
        [HttpPost("approve")]
        public async Task<IActionResult> Approve([FromBody] ApproveOrderCommandRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result) return NotFound("Sifariş tapılmadı");
            return Ok("Sifariş təsdiqləndi");
        }
        [HttpPost("cancel")]
        public async Task<IActionResult> Cancel([FromBody] CancelOrderCommandRequest request)
        {
            var result = await _mediator.Send(request);
            if (!result) return NotFound("Sifariş tapılmadı");
            return Ok("Sifariş ləğv edildi");
        }

    }
}
