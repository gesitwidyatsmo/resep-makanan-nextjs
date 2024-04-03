import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Resepnyo",
  description: "Resepnyo adalah aplikasi resep masakan yang dibuat dengan Next.js dan Tailwind CSS."
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
