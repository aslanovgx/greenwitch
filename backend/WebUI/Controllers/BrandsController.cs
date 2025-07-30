using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System.Text;
using WebUI.DTOs.BrandDto;
using WebUI.DTOs.CategoryDto;
using WebUI.Models;

namespace WebUI.Controllers
{
    [Authorize]
    public class BrandsController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        public BrandsController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }
        public async Task<IActionResult> Index(string categoryName)
        {
            var client = _httpClientFactory.CreateClient();
            string url = "http://localhost:7228/api/Brand/GetBrandsByCategory";

            if (!string.IsNullOrEmpty(categoryName))
                url = $"http://localhost:7228/api/Brand/GetBrandsByCategoryName?CategoryName={categoryName}";

            var responseMessage = await client.GetAsync(url);
            if (responseMessage.IsSuccessStatusCode)
            {
                var jsonData = await responseMessage.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<BrandResponseDto>(jsonData);

                // kateqoriyalar dropdown üçün
                var categoryResponse = await client.GetAsync("http://localhost:7228/api/Category");
                if (categoryResponse.IsSuccessStatusCode)
                {
                    var categoryJson = await categoryResponse.Content.ReadAsStringAsync();
                    var categoryData = JsonConvert.DeserializeObject<CategoryResponseDto>(categoryJson);
                    ViewBag.CategoryValues = categoryData.Categories.Select(x => new SelectListItem
                    {
                        Text = x.Name,
                        Value = x.Name,
                        Selected = x.Name == categoryName
                    }).ToList();
                }

                return View(result.Brands);
            }

            return View(new List<ResultBrandDto>());
        }


        [HttpGet]
        public async Task<IActionResult> CreateBrand()
        {
            var client = _httpClientFactory.CreateClient();
            //Kateqoriyalar
            var categoryResponse = await client.GetAsync("https://localhost:7228/api/Category");
            var categoryJson = await categoryResponse.Content.ReadAsStringAsync();
            var categoryData = JsonConvert.DeserializeObject<CategoryResponseDto>(categoryJson);
            ViewBag.CategoryValues = categoryData.Categories.Select(x => new SelectListItem
            {
                Text = x.Name,
                Value = x.Id.ToString()
            }).ToList();
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> CreateBrand(CreateBrandDto createBrandDto)
        {
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(createBrandDto);
            StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
            var responseMessage = await client.PostAsync("https://localhost:7228/api/Brand", stringContent);
            if (responseMessage.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> UpdateBrand(int Id)
        {
            var client = _httpClientFactory.CreateClient();
            var responseMessage = await client.GetAsync($"https://localhost:7228/api/Brand/{Id}");
            if (responseMessage.IsSuccessStatusCode)
            {
                var jsonData = await responseMessage.Content.ReadAsStringAsync();
                var values = JsonConvert.DeserializeObject<UpdateBrandDto>(jsonData);
                return View(values);
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> UpdateBrand(UpdateBrandDto updateBrandDto)
        {
            var client = _httpClientFactory.CreateClient();
            var jsonData = JsonConvert.SerializeObject(updateBrandDto);
            StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
            var responseMessage = await client.PutAsync("https://localhost:7228/api/Brand", stringContent);
            if (responseMessage.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            return View();
        }
        public async Task<IActionResult> DeleteBrand(int Id)
        {
            var client = _httpClientFactory.CreateClient();
            var responseMessage = await client.DeleteAsync($"https://localhost:7228/api/Brand/{Id}");
            if (responseMessage.IsSuccessStatusCode)
            {
                return RedirectToAction("Index");
            }
            return View();
        }

    }
}
