using WebUI.DTOs.CategoryDto;

namespace WebUI.DTOs.ProductDto
{
    public class ProductResponseDto
    {
        public List<ResultProductDto> Products { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
    }
}
