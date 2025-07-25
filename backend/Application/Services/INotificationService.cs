using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface INotificationService
    {
        void Add(string message);
        List<string> GetAll();
        void Clear();
    }
}
