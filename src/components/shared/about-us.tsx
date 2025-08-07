import Image from "next/image";

export default function AboutUs() {
  const loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.`;
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 relative">
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
              <p className="text-2xl text-primary tracking-wider font-serif italic font-light">
                ABOUT US
              </p>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary leading-tight">
                Elegant Celebrations,
                <br />
                Thoughtfully Designed
              </h2>

              <p className="text-primary leading-relaxed text-sm md:text-base max-w-lg">
                {loremIpsum}
              </p>
            </div>
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-primary"></div>
          </div>

          {/* Right Images Grid - 3 Column Layout with transform offset */}
          <div className="relative grid grid-cols-3 gap-4 h-[420px]">
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
