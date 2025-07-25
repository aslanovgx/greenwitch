using Application.Repositories.Brands;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.Brands.UpdateBrand
{
    public class UpdateBrandCommandHandler : IRequestHandler<UpdateBrandCommandRequest, UpdateBrandCommandResponse>
    {
        readonly IBrandWriteRepository _brandWriteRepository;
        readonly IBrandReadRepository _brandReadRepository;

        public UpdateBrandCommandHandler(IBrandWriteRepository brandWriteRepository, IBrandReadRepository brandReadRepository)
        {
            _brandWriteRepository = brandWriteRepository;
            _brandReadRepository = brandReadRepository;
        }

        public async Task<UpdateBrandCommandResponse> Handle(UpdateBrandCommandRequest request, CancellationToken cancellationToken)
        {
            Brand brand = await _brandReadRepository.GetByIdAsync(request.Id);
            brand.Name = request.Name;
            brand.CategoryId = request.CategoryId;
            await _brandWriteRepository.SaveChangesAsync();
            return new();
        }
    }
}
