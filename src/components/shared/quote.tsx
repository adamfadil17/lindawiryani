import Image from "next/image";

export default function Quote() {
  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Quote Text */}
        <div className="text-center mb-24">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary leading-relaxed max-w-5xl mx-auto italic">
            We bring timeless elegance to life — not just in appearance,
            <br className="hidden md:block" />
            but in the way your day feels: calm, graceful, and unforgettable.
          </h2>
        </div>

        {/* Images Layout */}
        <div className="relative">
          {/* Desktop Layout - 3 columns with middle offset */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {/* Left Image - Couple in field with veil */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/quotes1.png"
                alt="Couple embracing in field with flowing veil"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>

            {/* Center Image - Wedding ceremony with petals (offset down) */}
            <div className="relative aspect-[3/4] overflow-hidden transform translate-y-12">
              <Image
                src="/images/quotes2.png"
                alt="Wedding ceremony with guests throwing petals"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>

            {/* Right Image - Couple dancing */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/quotes3.png"
                alt="Couple dancing with flowing wedding dress"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          </div>

          {/* Mobile Layout - 2+1 arrangement */}
          <div className="md:hidden space-y-6">
            {/* Top Row - Two images side by side */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left Image - Couple in field with veil */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/quotes1.png"
                  alt="Couple embracing in field with flowing veil"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>

              {/* Right Image - Couple dancing */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/quotes2.png"
                  alt="Couple dancing with flowing wedding dress"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>

            {/* Bottom Row - Centered single image */}
            <div className="flex justify-center">
              <div className="relative aspect-[3/4] overflow-hidden w-1/2">
                <Image
                  src="/images/quotes3.png"
                  alt="Wedding ceremony with guests throwing petals"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
