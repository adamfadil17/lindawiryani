import Image from "next/image";

export default function AboutUs() {
  const loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.`;
  return (
    <section id="about" className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
          {/* Centered Vertical Divider Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-primary transform -translate-x-1/2 z-10"></div>

          {/* Left Content */}
          <div className="space-y-6 relative pr-0 lg:pr-8">
            {/* Decorative Floral Element */}
            <div className="w-24 h-24 mb-8">
              <Image
                src="/images/floral1.png"
                alt="Floral Element"
                width={120}
                height={120}
              />
            </div>

            <div className="space-y-4">
              <p className="text-2xl text-primary tracking-wider italic font-semibold">
                ABOUT US
              </p>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary leading-tight">
                WHERE ARCHITECTURE, ART, AND HOSPITALITY
                <br />
                CREATE TIMELESS WEDDINGS
              </h2>

              <p className="text-primary text-justify leading-relaxed text-base md:text-base">
                {`At Linda Wiryani Design & Event Planning, every celebration begins with a story — yours. With nearly two decades in Bali’s five-star hospitality industry, Linda combines her expertise in luxury events, public relations, sales and marketing with her refined eye for detail to create weddings defined by grace, warmth, and seamless execution. Her deep knowledge of Bali’s villa industry allows her to design intimate private villa weddings that blend exclusivity with authenticity. As the Creative Director of her fashion brand, My Lindway, Linda brings artistry and local craftsmanship into every element, from curated table settings to bespoke visual concepts , often enriched through creative collaboration with her architect husband. Beyond her professional world, she finds joy in family life with her two sons and their cheerful fur baby, a balance of love and inspiration that shines through every timeless celebration she designs.`}
              </p>
            </div>
          </div>

          {/* Right Images Grid - 3 Column Layout with transform offset */}
          <div className="relative grid grid-cols-3 gap-4 h-[420px] pl-0 lg:pl-8">
            {/* Left image - Castle couple */}
            <div className="col-span-1">
              <div className="relative h-full overflow-hidden">
                <Image
                  src="/images/about-us1.png"
                  alt="Linda Wiryani Assets"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </div>
            </div>

            {/* Center image - Wedding rings in gold frames (offset down with transform) */}
            <div className="col-span-1 transform translate-y-12">
              <div className="relative h-full overflow-hidden">
                <Image
                  src="/images/about-us2.png"
                  alt="Linda Wiryani Assets"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </div>
            </div>

            {/* Right image - Floral bouquet */}
            <div className="col-span-1">
              <div className="relative h-full overflow-hidden">
                <Image
                  src="/images/about-us3.png"
                  alt="Linda Wiryani Assets"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
