using Microsoft.AspNetCore.Mvc;

namespace AdminPanel.ViewComponents.LayoutComponents
{
    public class _LayoutHeaderComponentPartial : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
