using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Order
{
    public class OrderItemDto
    {
        public string Name { get; set; }
        public string Color { get; set; }
        public int Count { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal TotalDiscountPrice { get; set; }
    }
}
