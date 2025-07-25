using Application.Repositories;
using Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class WriteRepository<T> : IWriteRepository<T> where T : BaseEntity
    {
        readonly SaatDbContext _context;

        public WriteRepository(SaatDbContext context)
        {
            _context = context;
        }

        public DbSet<T> Table => _context.Set<T>();

        public async Task<bool> AddAsync(T entity)
        {
            await Table.AddAsync(entity);
            return true;
        }

        public async Task<bool> AddRangeAsync(IEnumerable<T> entities)
        {
            await Table.AddRangeAsync(entities);
            return true;
        }

        public bool Remove(T entity)
        {
            Table.Remove(entity);
            return true;
        }

        public async Task<bool> RemoveAsync(int id)
        {
            T table = await Table.FindAsync(id);
            return Remove(table);
        }

        public bool RemoveRange(IEnumerable<T> entities)
        {
            Table.RemoveRange(entities);
            return true;
        }


        public bool Update(T entity)
        {
            Table.Update(entity);
            return true;
        }

        public async Task<int> SaveChangesAsync()
            => await _context.SaveChangesAsync();
    }
}
