import { Jura } from "next/font/google";
import "./globals.css";

const jura = Jura({ subsets: ["latin"] });

export const metadata = {
  title: "WatchFinder",
  description: "Watch and Find Items",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jura.className}>{children}</body>
    </html>
  );
}
