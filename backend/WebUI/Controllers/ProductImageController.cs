using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebUI.DTOs.BrandDto;
using WebUI.DTOs.CategoryDto;
using WebUI.DTOs.ProductDto;
using WebUI.DTOs.ProductImageDto;

namespace AdminPanel.Controllers
{
    [Authorize]
    public class ProductImageController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ProductImageController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<IActionResult> Update()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync("https://localhost:7228/api/Category");

            if (!response.IsSuccessStatusCode)
                return Json(new object[] { });

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<CategoryResponseDto>(json);

            var categories = result.Categories.Select(c => new { id = c.Id, name = c.Name });
            return Json(categories);
        }

        [HttpGet]
        public async Task<IActionResult> GetBrandsByCategoryName(string categoryName)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"https://localhost:7228/api/Brand/GetBrandsByCategoryName?CategoryName={categoryName}");

            if (!response.IsSuccessStatusCode)
                return Json(new object[] { });

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<BrandResponseDto>(json);

            var brands = result.Brands.Select(b => new { id = b.Id, name = b.Name });
            return Json(brands);
        }

        [HttpGet]
        public async Task<IActionResult> GetProductsByBrand(string brandName)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"https://localhost:7228/api/Product/GetProductsByBrandName?BrandName={brandName}");

            if (!response.IsSuccessStatusCode)
                return Json(new object[] { });

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<ProductResponseDto>(json);

            var products = result.Products.Select(p => new { id = p.Id, name = p.Name });
            return Json(products);
        }

        [HttpPost]
        public async Task<IActionResult> Update(UpdateProductImageDto model)
        {
            if (model.Files == null || !model.Files.Any())
            {
                ModelState.AddModelError("", "Zəhmət olmasa ən azı 1 şəkil seçin.");
                return View(model);
            }

            using var content = new MultipartFormDataContent();
            content.Add(new StringContent(model.ProductId.ToString()), "ProductId");

            foreach (var file in model.Files)
            {
                var streamContent = new StreamContent(file.OpenReadStream());
                streamContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(file.ContentType);
                content.Add(streamContent, "Files", file.FileName); 
            }

            var client = _httpClientFactory.CreateClient();
            var response = await client.PostAsync("https://localhost:7228/api/ProductImage/update-product-image", content); 

            if (response.IsSuccessStatusCode)
            {
                TempData["Success"] = "Şəkillər uğurla yeniləndi!";
                return RedirectToAction("Update");
            }

            ModelState.AddModelError("", "Yeniləmə zamanı xəta baş verdi.");
            return View(model);
        }


        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.DeleteAsync($"https://localhost:7228/api/ProductImage/{id}");

            if (response.IsSuccessStatusCode)
            {
                TempData["Success"] = "Şəkil uğurla silindi!";
            }
            else
            {
                TempData["Error"] = "Şəkili silmək mümkün olmadı.";
            }

            return RedirectToAction("Upload");
        }
    }
}
