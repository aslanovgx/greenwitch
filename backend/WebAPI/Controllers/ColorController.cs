using Application.Features.Commands.Colors.CreateColor;
using Application.Features.Commands.Colors.RemoveColor;
using Application.Features.Commands.Colors.UpdateColor;
using Application.Features.Queries.Colors.GetAllColor;
using Application.Features.Queries.Colors.GetByIdColor;
using Application.Features.Queries.Genders.GetAllGender;
using Application.Features.Queries.Genders.GetByIdGender;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        readonly IMediator _mediator;
        public ColorController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllColors([FromQuery] GetAllColorQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetByIdColor([FromRoute] GetByIdColorQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateColor(CreateColorCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateColor(UpdateColorCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> RemoveColor([FromRoute] RemoveColorCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }
    }
}
