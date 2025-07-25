using Microsoft.AspNetCore.Mvc.Rendering;
using WebUI.DTOs.CategoryDto;
using WebUI.DTOs.ProductDto;

namespace WebUI.Models
{
    public class ProductListViewModel
    {
        public List<ResultProductDto> Products { get; set; } = new();
        public int TotalCount { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }

        public int? SelectedCategoryId { get; set; }
        public List<CategoryItemDto> Categories { get; set; } = new();
    }

}
