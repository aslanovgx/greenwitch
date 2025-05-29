import type { Metadata } from "next";
import "./globals.css";
import { montserrat, lato } from './../fonts';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FavoriteProvider } from "@/context/FavoritesContext";

import { SearchProvider } from "@/context/SearchContext";

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
            <main>{children}</main>
            <Footer />
          </FavoriteProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
