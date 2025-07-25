using Domain.Entities.Common;

namespace Domain.Entities
{
    public class OrderItem : BaseEntity
    {
        public string Name { get; set; }
        public string Color { get; set; }
        public int Count { get; set; }
        public decimal Price { get; set; }         // Əsl qiymət (unit price)
        public decimal DiscountPrice { get; set; } // Endirimli qiymət (unit price)
        public decimal TotalPrice => Price * Count;                // Ümumi qiymət (əsli)
        public decimal TotalDiscountPrice => DiscountPrice * Count; // Ümumi endirimli qiymət

        // Xarici açar və əlaqə
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
