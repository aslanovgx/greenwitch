using Domain.Entities;

namespace WebUI.Models
{
    public class OrderListViewModel
    {
        public List<Order> Orders { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
    }

}
