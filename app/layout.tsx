import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alwan | Portofolio Web Developer & UI/UX Designer",
  description: "Portofolio Alwan - Mahasiswa Tingkat Akhir Sistem Informasi, Fullstack Web Developer, dan Desainer UI/UX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
