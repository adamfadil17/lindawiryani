import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import FloatingContactButton from "@/components/shared/floating-contact-button";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="home" className="min-h-screen overflow-x-hidden">
      <Header />
      {children}
      <Footer />
      <FloatingContactButton />
    </div>
  );
}