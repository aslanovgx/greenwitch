using Application.Repositories.Brands;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Brands.CreateBrand
{
    public class CreateBrandCommandHandler : IRequestHandler<CreateBrandCommandRequest, CreateBrandCommandResponse>
    {
        readonly IBrandWriteRepository _brandWriteRepository;

        public CreateBrandCommandHandler(IBrandWriteRepository brandWriteRepository)
        {
            _brandWriteRepository = brandWriteRepository;
        }

        public async Task<CreateBrandCommandResponse> Handle(CreateBrandCommandRequest request, CancellationToken cancellationToken)
        {
            await _brandWriteRepository.AddAsync(new Brand()
            {
                CategoryId = request.CategoryId,
                Name = request.Name
            });
            await _brandWriteRepository.SaveChangesAsync();
            return new();
        }
    }
}
