import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white/95 backdrop-blur-sm pt-16 lg:pt-20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-4 lg:py-8 border-primary border-b-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Section - Logo, Tagline, and Address */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/images/logo-gray.png"
                alt="Linda Wiryani | Luxury Wedding Planner & Designer in Bali"
                width={200}
                height={80}
                className="object-contain"
                priority
              />
            </div>

            {/* Tagline */}
            <p className="text-primary text-sm tracking-[0.4em] uppercase font-light">
              DESIGN • EVENT PLANNING
            </p>

            {/* Address */}
            <p className="text-primary text-md font-light max-w-md mx-auto lg:mx-0">
              © 2025 Jalan Trengguli IV Gang IVB No. 11 Denpasar Timur, Bali
              80239, Indonesia.
            </p>
          </div>

          {/* Right Section - Navigation and Social Media */}
          <div className="space-y-12 text-center lg:text-left">
            {/* Navigation Links */}
            <div className="grid grid-cols-3 gap-x-8 gap-y-3 justify-items-center lg:justify-items-start">
              <a
                href="#home"
                className="text-primary hover:text-primary/80 transition-colors text-sm tracking-wider font-light"
              >
                HOME
              </a>
              <a
                href="#about"
                className="text-primary hover:text-primary/80 transition-colors text-sm tracking-wider font-light"
              >
                ABOUT
              </a>
              <a
                href="#services"
                className="text-primary hover:text-primary/80 transition-colors text-sm tracking-wider font-light"
              >
                SERVICES
              </a>
              <a
                href="#venues"
                className="text-primary hover:text-primary/80 transition-colors text-sm tracking-wider font-light"
              >
                VENUES
              </a>
              <a
                href="#gallery"
                className="text-primary hover:text-primary/80 transition-colors text-sm tracking-wider font-light"
              >
                GALLERY
              </a>
              <a
                href="#contact"
                className="text-primary hover:text-primary/80 transition-colors text-sm tracking-wider font-light"
              >
                CONTACT
              </a>
            </div>

            {/* Social Media Section */}
            <div className="space-y-4">
              <p className="text-primary text-sm font-light">
                Reach out and follow us at
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-4 justify-center lg:justify-start">
                <a
                  href="https://wa.me/628113980998"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-primary/80 transition-colors"
                  aria-label="WhatsApp"
                >
                  <Image
                    src="/images/whatsapp-brown.svg"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                  />
                </a>

                <a
                  href="mailto: lindawiryanievents@gmail.com"
                  className="text-stone-400 hover:text-primary/80 transition-colors"
                  aria-label="Email"
                >
                  <Image
                    src="/images/email-brown.svg"
                    alt="Email"
                    width={24}
                    height={24}
                  />
                </a>

                <a
                  href="https://instagram.com/lindawiryanievents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-primary/80 transition-colors"
                  aria-label="Instagram"
                >
                  <Image
                    src="/images/instagram-brown.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                  />
                </a>

                <a
                  href="https://pinterest.com/lindawiryanievents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-primary/80 transition-colors"
                  aria-label="Pinterest"
                >
                  <Image
                    src="/images/pinterest-line-brown.svg"
                    alt="Pinterest"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
