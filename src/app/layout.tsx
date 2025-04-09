import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./(components)/Footer/Footer";
import NavBar from "./(components)/NavBar/NavBar";
import { SessionProviders } from "./providers";
import { CartDataContextProvider } from "./(context)/CartContext";
import { CartPageContextProvider } from "./(context)/CartIconContext";
import Cart from "./(components)/Cart/Cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviders>
          <CartPageContextProvider>
            <CartDataContextProvider>
              <NavBar/>
              <Cart/>
                {children}
              <Footer/>
            </CartDataContextProvider>
          </CartPageContextProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
