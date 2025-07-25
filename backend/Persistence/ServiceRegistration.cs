using Application.Repositories.Brands;
using Application.Repositories.Categories;
using Application.Repositories.Colors;
using Application.Repositories.Genders;
using Application.Repositories.OrderItems;
using Application.Repositories.Orders;
using Application.Repositories.ProductImages;
using Application.Repositories.Products;
using Application.Repositories.Shapes;
using Application.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Contexts;
using Persistence.Repositories.Brands;
using Persistence.Repositories.Categories;
using Persistence.Repositories.Colors;
using Persistence.Repositories.Genders;
using Persistence.Repositories.OrderItems;
using Persistence.Repositories.Orders;
using Persistence.Repositories.ProductImages;
using Persistence.Repositories.Products;
using Persistence.Repositories.Shapes;
using Persistence.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SaatDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IProductWriteRepository, ProductWriteRepository>();
            services.AddScoped<IProductReadRepository, ProductReadRepository>();
            services.AddScoped<IBrandWriteRepository, BrandWriteRepository>();
            services.AddScoped<IBrandReadRepository, BrandReadRepository>();
            services.AddScoped<ICategoryWriteRepository, CategoryWriteRepository>();
            services.AddScoped<ICategoryReadRepository, CategoryReadRepository>();
            services.AddScoped<IGenderWriteRepository, GenderWriteRepository>();
            services.AddScoped<IGenderReadRepository, GenderReadRepository>();
            services.AddScoped<IProductImageReadRepository, ProductImageReadRepository>();
            services.AddScoped<IProductImageWriteRepository, ProductImageWriteRepository>();
            services.AddScoped<IColorReadRepository, ColorReadRepository>();
            services.AddScoped<IColorWriteRepository, ColorWriteRepository>();
            services.AddScoped<IShapeReadRepository, ShapeReadRepository>();
            services.AddScoped<IShapeWriteRepository, ShapeWriteRepository>();
            services.AddScoped<IOrderWriteRepository, OrderWriteRepository>();
            services.AddScoped<IOrderReadRepository, OrderReadRepository>();
            services.AddScoped<IOrderItemWriteRepository, OrderItemWriteRepository>();
            services.AddScoped<IOrderItemReadRepository, OrderItemReadRepository>();
           
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<INotificationService, NotificationService>();


        }
    }
}
