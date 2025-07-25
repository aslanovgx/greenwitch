using Microsoft.AspNetCore.Mvc;

namespace AdminPanel.Controllers
{
    public class AdminLayoutController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
