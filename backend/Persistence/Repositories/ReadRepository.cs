using Application.Repositories;
using Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class ReadRepository<T> : IReadRepository<T> where T : BaseEntity
    {
        readonly SaatDbContext _context;

        public ReadRepository(SaatDbContext context)
        {
            _context = context;
        }

        public DbSet<T> Table => _context.Set<T>();

        public IQueryable<T> GetAll(bool tracking = true)
        {
            IQueryable<T> query = Table;
            if (!tracking)
                query = query.AsNoTracking();
            return query;
        }

        public async Task<T> GetByIdAsync(int id, bool tracking = true)
        {
            IQueryable<T> query = Table;
            if (!tracking)
                query = query.AsNoTracking();
            return await query.FirstOrDefaultAsync(data => data.Id == id);
        }

        public async Task<T> GetSingleAsync(Func<T, bool> filter, bool tracking = true)
        {
            IQueryable<T> query = Table;
            if (!tracking)
                query = query.AsNoTracking();
            return await query.FirstOrDefaultAsync();
        }

        public IQueryable<T> GetWhere(Expression<Func<T, bool>> filter, bool tracking = true)
        {
            IQueryable<T> query = Table;
            if (!tracking)
                query = query.AsNoTracking();

            if (filter != null)
                query = query.Where(filter);

            return query;
        }

    }
}
