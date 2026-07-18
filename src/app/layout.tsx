import type { Metadata } from "next";
import "../styles/main.scss";
import { ClientProviders } from "./ClientProviders";

export const metadata: Metadata = {
  title: "Lendsqr Admin Dashboard",
  description: "Lendsqr assessment app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
