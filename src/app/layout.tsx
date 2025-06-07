import type { Metadata } from "next";
import "./globals.css";
import { montserrat, lato } from './../fonts';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FavoriteProvider } from "@/context/FavoritesContext";
import { SearchProvider } from "@/context/SearchContext";
import { ToastContainer } from "react-toastify"; // ✅ toastify əlavə olunur
import "react-toastify/dist/ReactToastify.css";   // ✅ toastify CSS-i
// import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "greenwitch",
  description: "",
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
            <Navbar />
            {/* <Container> */}
              <main>{children}</main>
            {/* </Container> */}
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
          </FavoriteProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
