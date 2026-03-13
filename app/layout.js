import { Providers } from "@/components/shared/Providers";
import "./globals.css";

export const metadata = {
  title: "Reddy Consultancy | College Admission Consultancy Platform",
  description: "Premium college admission consultancy SaaS platform with CRM, student portal, booking, payments, and analytics.",
  metadataBase: new URL("https://reddyconsultancy.com"),
  icons: {
    icon: "/images/logo1.png",
    apple: "/images/logo1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
