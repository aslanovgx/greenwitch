using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IFileService
    {
        Task<string> UploadAsync(IFormFile formFile, string root);
        Task DeleteAsync(string filePath);
        Task<string> UpdateAsync(IFormFile formFile, string filePath, string root);

    }
}
