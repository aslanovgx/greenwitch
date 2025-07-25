using Application.Features.Commands.Genders.CreateGender;
using Application.Features.Commands.Genders.RemoveGender;
using Application.Features.Commands.Genders.UpdateGender;
using Application.Features.Commands.Shapes.CreateShape;
using Application.Features.Commands.Shapes.RemoveShape;
using Application.Features.Commands.Shapes.UpdateShape;
using Application.Features.Queries.Genders.GetAllGender;
using Application.Features.Queries.Genders.GetByIdGender;
using Application.Features.Queries.Shapes.GetAllShape;
using Application.Features.Queries.Shapes.GetByIdShape;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShapeController : ControllerBase
    {
        readonly IMediator _mediator;

        public ShapeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllShapes([FromQuery] GetAllShapeQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetByIdShape([FromRoute] GetByIdShapeQueryRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateShape(CreateShapeCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateShape(UpdateShapeCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> RemoveShape([FromRoute] RemoveShapeCommandRequest request)
        {
            var response = await _mediator.Send(request);
            return Ok(response);
        }
    }
}

