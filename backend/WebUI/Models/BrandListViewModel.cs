using Microsoft.AspNetCore.Mvc.Rendering;
using WebUI.DTOs.BrandDto;
using WebUI.DTOs.CategoryDto;

namespace WebUI.Models
{
    public class BrandListViewModel
    {
        public List<ResultBrandDto> Brands { get; set; } = new();
        public int TotalCount { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }

        public string? SelectedCategoryName { get; set; }
        public List<CategoryItemDto> Categories { get; set; } = new();
    }
}
