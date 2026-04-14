import Image from "next/image";
import Link from "next/link";

const navigationItems = [
  { name: "HOME", href: "/" },
  { name: "OUR APPROACH", href: "/our-approach" },
  { name: "SERVICES", href: "/services" },
  {
    name: "WEDDING EXPERIENCES",
    href: "/wedding-experiences",
    submenu: [
      {
        name: "Private Villa Weddings",
        href: "/wedding-experiences/private-villa-weddings",
      },
      {
        name: "Intimate Weddings",
        href: "/wedding-experiences/intimate-weddings",
      },
      {
        name: "Elopement Weddings",
        href: "/wedding-experiences/elopement-weddings",
      },
      { name: "Luxury Weddings", href: "/wedding-experiences/luxury-weddings" },
      {
        name: "Destination Weddings",
        href: "/wedding-experiences/bali-destination-wedding",
      },
    ],
  },
  { name: "WEDDING CONCEPTS", href: "/wedding-concepts" },
  { name: "DESTINATIONS", href: "/destinations" },
  { name: "PORTFOLIO", href: "/portfolio" },
  { name: "JOURNAL", href: "/journal" },
  { name: "WORKING WITH US", href: "/working-with-us" },
  { name: "CONTACT", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-white/95 backdrop-blur-sm pt-16 lg:pt-20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-4 lg:py-8 border-primary border-b-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8 text-center lg:text-left">
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

            <p className="text-primary text-sm tracking-[0.4em] uppercase font-light">
              DESIGN • EVENT PLANNING
            </p>

            <p className="text-primary text-md font-light max-w-md mx-auto lg:mx-0">
              © 2026 Jalan Trengguli IV Gang IVB No. 11 Denpasar Timur, Bali
              80239, Indonesia.
            </p>
          </div>

          <div className="space-y-12 text-center lg:text-left">
            <nav className="grid grid-cols-2 gap-x-8 gap-y-0">
              <ul className="flex flex-col gap-y-2.5 items-center lg:items-start">
                {navigationItems
                  .filter((item) => !item.submenu)
                  .map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-primary hover:text-primary/80 transition-colors text-sm tracking-wider font-light"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>

              <div className="flex flex-col gap-y-2.5 items-center lg:items-start">
                {navigationItems
                  .filter((item) => item.submenu)
                  .map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        className="text-primary hover:text-primary/80 transition-colors text-sm tracking-wider font-light"
                      >
                        {item.name}
                      </Link>
                      <ul className="mt-2 flex flex-col gap-y-2 pl-3 border-l border-primary/50 items-center lg:items-start">
                        {item.submenu!.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className="text-primary/80 hover:text-primary transition-colors text-sm tracking-wider font-light"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </nav>

            <div className="space-y-4">
              <p className="text-primary text-sm font-light">
                Reach out and follow us at
              </p>

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
                  href="mailto:lindawiryanievents@gmail.com"
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
