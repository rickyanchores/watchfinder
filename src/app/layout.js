import { Roboto } from "next/font/google";
import "./globals.css";


const roboto = Roboto({ 
  subsets: ["latin"],
  weight: "500"  // Use a string literal instead of a template literal.
});

export const metadata = {
  title: "WatchFinder",
  description: "Watch and Find Items",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
