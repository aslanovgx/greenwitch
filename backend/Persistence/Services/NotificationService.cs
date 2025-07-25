using Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Services
{

    public class NotificationService : INotificationService
    {
        private static List<string> _notifications = new();

        public void Add(string message)
        {
            _notifications.Insert(0, message);
        }

        public List<string> GetAll()
        {
            return _notifications.ToList();
        }

        public void Clear()
        {
            _notifications.Clear();
        }
    }
}
