namespace WebUI.DTOs.ProductImageDto
{
    public class UpdateProductImageDto
    {
        public int ProductId { get; set; }
        public List<IFormFile> Files { get; set; }
    }

}
