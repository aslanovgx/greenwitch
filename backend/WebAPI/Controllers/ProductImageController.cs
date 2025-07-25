using Application.Features.Commands.Brands.CreateBrand;
using Application.Features.Commands.ProductImages.CreateProductImage;
using Application.Features.Commands.ProductImages.RemoveProductImage;
using Application.Features.Commands.ProductImages.UpdateProductImage;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductImageController : ControllerBase
    {
        readonly IMediator _mediator;

        public ProductImageController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] CreateProductImageCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPost("update-product-image")]
        public async Task<IActionResult> UpdateProductImage([FromForm] UpdateProductImageCommandRequest request)
        {
            await _mediator.Send(request);
            return Ok("Şəkillər uğurla əvəzləndi.");
        }


        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete([FromRoute] RemoveProductImageCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

    }
}
