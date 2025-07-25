using Application.Repositories.Genders;
using Domain.Entities;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories.Genders
{
    public class GenderReadRepository : ReadRepository<Gender>, IGenderReadRepository
    {
        public GenderReadRepository(SaatDbContext context) : base(context)
        {
        }
    }
}
