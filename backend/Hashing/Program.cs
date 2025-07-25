using Infrastructure.Utilities.Helpers;

namespace Hashing
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var password = "28Mall.2025!";
            var hash = PasswordHasher.HashPassword(password);
            Console.WriteLine(hash);
        }
    }
}
