using Application.Features.Commands.Products.CreateProduct;
using Application.Features.Commands.Products.RemoveProduct;
using Application.Features.Commands.Products.UpdateProduct;
using Application.Features.Queries.Products.GetAllNewProducts;
using Application.Features.Queries.Products.GetAllProduct;
using Application.Features.Queries.Products.GetAllProductWithAll;
using Application.Features.Queries.Products.GetBestSellerProducts;
using Application.Features.Queries.Products.GetByIdProduct;
using Application.Features.Queries.Products.GetDiscountedProducts;
using Application.Features.Queries.Products.GetProductsByBrandName;
using Application.Features.Queries.Products.GetProductsByFilter;
using Application.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        readonly IMediator _mediator;

        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllProducts([FromQuery] GetAllProductQueryRequest request) 
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet("GetAllProductsWith")]
        public async Task<IActionResult> GetAllProductsWith([FromQuery] GetAllProductWithAllQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet("GetBestSellerProducts")]
        public async Task<IActionResult> GetBestSellerProducts([FromQuery] GetBestSellerProductsQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet("GetDiscountedProducts")]
        public async Task<IActionResult> GetDiscountedProducts([FromQuery] GetDiscountedProductsQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet("GetAllNewProducts")]
        public async Task<IActionResult> GetAllNewProducts([FromQuery] GetAllNewProductsQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet("GetProductsByBrandName")]
        public async Task<IActionResult> GetProductsByBrandName([FromQuery] GetProductsByBrandNameQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }


        [HttpGet("{Id}")]
        public async Task<IActionResult> GetByIdProduct([FromRoute] GetByIdProductQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet("GetProductsByFilter")]
        public async Task<IActionResult> GetProductsByFilter([FromQuery] GetProductsByFilterQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromForm] CreateProductCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProduct(UpdateProductCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> RemoveProduct([FromRoute] RemoveProductCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        
    }
}
