using Microsoft.AspNetCore.Mvc;

namespace AdminPanel.ViewComponents.UILayoutComponents
{
    public class _UILayoutHeadComponentPartial : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
