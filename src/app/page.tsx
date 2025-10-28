import AboutUs from "@/components/shared/about-us";
import Contact from "@/components/shared/contact";
import Footer from "@/components/shared/footer";
import Gallery from "@/components/shared/gallery";
import Header from "@/components/shared/header";
import Instagram from "@/components/shared/instagram";
import Quote from "@/components/shared/quote";
import Services from "@/components/shared/services";
import Venues from "@/components/shared/venues";
import Link from "next/link";

export default function Page() {
  const loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.`;
  return (
    <div id="home" className="min-h-screen">
      <Header />

      {/* Hero Section dengan padding-top untuk kompensasi sticky navbar */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative pt-28 md:pt-32 lg:pt-48"
        style={{
          backgroundImage: `url('/images/hero.png')`,
        }}
      >
        {/* Vertical shadow gradient overlay from bottom to top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>

        {/* Content wrapper with relative positioning */}
        <div className="relative z-10">
          {/* Hero content positioned on the left */}
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-16 lg:py-24">
            <div className="max-w-2xl text-white">
              <p className="text-sm md:text-base tracking-widest mb-8 font-light">
                DESIGN • EVENT PLANNING
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
                WHERE EVERY DETAIL
                <br />& REFLECTS YOUR STORY
              </h1>
              <p className="text-sm md:text-base leading-relaxed mb-8 font-light">
                {`Luxury-inspired Bali wedding styling and event planning with five-star hospitality standards.`}
              </p>
              <Link href="#instagram">
                <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-white hover:text-primary transition-colors duration-300">
                  JOIN THE EXPERIENCE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sections lainnya tidak perlu padding karena sudah tidak overlap dengan navbar */}
      <AboutUs />
      <Services />
      <Venues />
      <Quote />
      <Gallery />
      <Instagram />
      <Contact />
      <Footer />
    </div>
  );
}
