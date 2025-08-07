import AboutUs from "@/components/shared/about-us";
import Header from "@/components/shared/header";
import Services from "@/components/shared/services";
import Venues from "@/components/shared/venues";

export default function Page() {
  const loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.`;
  return (
    <div className="min-h-screen">
      {/* Background image for demonstration */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('/images/hero.png')`,
        }}
      >
        {/* Vertical shadow gradient overlay from bottom to top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>

        {/* Content wrapper with relative positioning */}
        <div className="relative z-10">
          <Header />

          {/* Hero content positioned on the left */}
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-16 lg:py-24">
            <div className="max-w-2xl text-white">
              <p className="text-sm md:text-base tracking-widest mb-8 font-light">
                DESIGN • EVENT PLANNING
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
                BESPOKE WEDDING CREATION &<br />
                ELEVATED DESIGN
              </h1>
              <p className="text-sm md:text-base leading-relaxed mb-8 font-light max-w-lg">
                {loremIpsum}
              </p>
              <button className="border border-white rounded-[4px] text-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                JOIN THE EXPERIENCE
              </button>
            </div>
          </div>
        </div>
      </div>
      <AboutUs />
      <Services />
      <Venues />
    </div>
  );
}
