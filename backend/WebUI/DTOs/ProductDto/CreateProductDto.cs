namespace WebUI.DTOs.ProductDto
{
    public class CreateProductDto
    {

        public int GenderId { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
        public List<int> ColorIds { get; set; }
        public int? ShapeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public decimal? DiscountPrice { get; set; }
        public bool BestSeller { get; set; }
        public List<IFormFile> Files { get; set; } = new List<IFormFile>();
    }
}
