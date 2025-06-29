import type { Metadata } from "next";
import "./globals.css";
import { montserrat, lato } from './../fonts';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FavoriteProvider } from "@/context/FavoritesContext";
import { SearchProvider } from "@/context/SearchContext";
import { ToastContainer } from "react-toastify"; // ✅ toastify əlavə olunur
import "react-toastify/dist/ReactToastify.css";   // ✅ toastify CSS-i
import { BagProvider } from "@/context/BagContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Greenwitch | Sustainable Lifestyle",
  description: "Discover eco-friendly products with Greenwitch.",
  openGraph: {
    title: "Greenwitch",
    description: "Discover eco-friendly products with Greenwitch.",
    type: "website",
    locale: "en_US",
    url: "https://greenwitch.com",
    images: [
      {
        url: "https://greenwitch.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Greenwitch",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${lato.variable} antialiased`}
      >
        <SearchProvider>
          <FavoriteProvider>
            <BagProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />

              {/* ✅ ToastContainer sağ yuxarı üçün */}
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light" // istəsən 'dark' da yaza bilərsən
              />
              <Toaster position="top-center" reverseOrder={false} />
            </BagProvider>
          </FavoriteProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
