import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");

  const navigationItems = [
    { name: t("home"), href: "/" },
    { name: t("ourApproach"), href: "/our-approach" },
    { name: t("services"), href: "/services" },
    {
      name: t("weddingExperiences"),
      href: "/wedding-experiences",
      submenu: [
        {
          name: t("weddingExperiencesSubmenu.privateVilla"),
          href: "/wedding-experiences/private-villa-weddings",
        },
        {
          name: t("weddingExperiencesSubmenu.intimate"),
          href: "/wedding-experiences/intimate-weddings",
        },
        {
          name: t("weddingExperiencesSubmenu.elopement"),
          href: "/wedding-experiences/elopement-weddings",
        },
        {
          name: t("weddingExperiencesSubmenu.luxury"),
          href: "/wedding-experiences/luxury-weddings",
        },
        {
          name: t("weddingExperiencesSubmenu.destination"),
          href: "/wedding-experiences/bali-destination-wedding",
        },
      ],
    },
    { name: t("weddingConcepts"), href: "/wedding-concepts" },
    { name: t("destinations"), href: "/destinations" },
    { name: t("portfolio"), href: "/portfolio" },
    { name: t("journal"), href: "/journal" },
    { name: t("workingWithUs"), href: "/working-with-us" },
    { name: t("contact"), href: "/contact" },
  ];

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
              {tFooter("tagline")}
            </p>

            {/* Address */}
            <p className="text-primary text-md font-light max-w-md mx-auto lg:mx-0">
              {tFooter("address")}
            </p>
          </div>

          {/* Right Section - Navigation and Social Media */}
          <div className="space-y-12 text-center lg:text-left">
            {/* Navigation Links */}
            <nav className="grid grid-cols-2 gap-x-8 gap-y-0">
              {/* Left column: main nav items */}
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

              {/* Right column: Wedding Experiences + submenu */}
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

            {/* Social Media Section */}
            <div className="space-y-4">
              <p className="text-primary text-sm font-light">
                {tFooter("followUs")}
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
