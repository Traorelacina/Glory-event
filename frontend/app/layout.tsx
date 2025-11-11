import "./globals.css";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";

export const metadata = {
  title: "Mon site",
  description: "Description...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />

        <main className="min-h-screen pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
