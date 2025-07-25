using Application.Services;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Persistence.Services
{
    public class FileService : IFileService
    {
        public async Task<string> UploadAsync(IFormFile formFile, string root)
        {
            if (formFile == null || formFile.Length == 0)
                throw new ArgumentException("Fayl boşdur.");

            if (!Directory.Exists(root))
                Directory.CreateDirectory(root);

            string nameWithoutExtension = Path.GetFileNameWithoutExtension(formFile.FileName);
            string extension = Path.GetExtension(formFile.FileName);

            var fileName = $"{nameWithoutExtension}-{Guid.NewGuid().ToString().Substring(0, 1)}{extension}";
            var filePath = Path.Combine(root, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await formFile.CopyToAsync(stream);
            }

            return fileName;
        }

        public Task DeleteAsync(string filePath)
        {
            if (string.IsNullOrWhiteSpace(filePath))
                throw new ArgumentException("Silinəcək fayl yolu boşdur.");

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            return Task.CompletedTask;
        }

        public async Task<string> UpdateAsync(IFormFile formFile, string filePath, string root)
        {
            if (string.IsNullOrWhiteSpace(filePath))
                throw new ArgumentException("Köhnə fayl yolu boşdur.");

            await DeleteAsync(filePath); // Köhnə faylı sil
            return await UploadAsync(formFile, root); // Yenisini yüklə
        }
    }
}
