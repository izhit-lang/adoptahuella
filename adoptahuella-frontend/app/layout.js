export const instant = false;

import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "AdoptaHuella",
  description: "Plataforma para la gestión de adopción responsable de mascotas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}