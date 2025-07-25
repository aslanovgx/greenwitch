using Application.Features.Commands.Brands.CreateBrand;
using Application.Features.Commands.Brands.RemoveBrand;
using Application.Features.Commands.Brands.UpdateBrand;
using Application.Features.Queries.Brands.GetAllBrand;
using Application.Features.Queries.Brands.GetBrandsByCategory;
using Application.Features.Queries.Brands.GetBrandsByCategoryName;
using Application.Features.Queries.Brands.GetByIdBrand;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        readonly IMediator _mediator;

        public BrandController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllBrands([FromQuery] GetAllBrandQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet("GetBrandsByCategoryName")]
        public async Task<IActionResult> GetBrandsByCategoryName([FromQuery] GetBrandsByCategoryNameQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet("GetBrandsByCategory")]
        public async Task<IActionResult> GetBrandsByCategory([FromQuery] GetBrandsByCategoryQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetByIdBrand([FromRoute] GetByIdBrandQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBrand(CreateBrandCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateBrand(UpdateBrandCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> RemoveBrand([FromRoute] RemoveBrandCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }
    }
}
