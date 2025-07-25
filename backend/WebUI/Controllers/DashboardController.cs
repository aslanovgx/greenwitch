using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence.Contexts;
using System;

namespace WebUI.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly SaatDbContext _context;

        public DashboardController(SaatDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            //Mehsul sayi
            int productCount = _context.Products
                .Count();
            ViewBag.ProductCount = productCount;

            //Satis sayi
            int confirmedSalesCount = _context.Orders
                .Count(o => o.Status == OrderStatus.Approved);
            ViewBag.SalesCount = confirmedSalesCount;

            //Gozleyen Sifarisler
            int pendingOrderCount = _context.Orders
           .Count(o => o.Status == OrderStatus.Pending);  // və ya status adı layihədə necədirsə ona uyğun
            ViewBag.PendingOrdersCount = pendingOrderCount;

            //Umumi Gelir
            decimal totalRevenue = _context.Orders
            .Where(o => o.Status == OrderStatus.Approved)
            .SelectMany(o => o.OrderItems)
            .Sum(oi => oi.Price * oi.Count);
            ViewBag.TotalRevenue = totalRevenue.ToString("N0");

            //Magaza Statistikalari
            var approvedOrders = _context.Orders
       .Include(o => o.OrderItems)
       .Where(o => o.Status == OrderStatus.Approved) // Yalnız təsdiqlənmişlər
       .ToList();

            var storeNames = new List<string> { "28 Mall", "Gənclik Mall", "Metro Park", "Park Bulvar", "Port Baku Mall", "Sumqayıt", "Zefir Mall" };

            var storeSales = storeNames.ToDictionary(
                store => store,
                store => approvedOrders
                            .Where(o => o.Store == store)
                            .Sum(o => o.OrderItems.Sum(oi => oi.DiscountPrice * oi.Count))
            );

            ViewBag.StoreSales = storeSales;
            return View();
        }
    }
}
