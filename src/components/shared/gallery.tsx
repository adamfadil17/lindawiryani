import Image from "next/image";

export default function Gallery() {
  const galleryImages = [
    {
      src: "/images/gallery1.png",
      alt: "Wedding ceremony with guests throwing confetti",
      orientation: "landscape",
    },
    {
      src: "/images/gallery2.png",
      alt: "Beautiful bridal bouquet with peach roses",
      orientation: "portrait",
    },
    {
      src: "/images/gallery3.png",
      alt: "Elegant couple portrait",
      orientation: "portrait",
    },
    {
      src: "/images/gallery4.png",
      alt: "Elegant outdoor wedding table setting",
      orientation: "portrait",
    },
    {
      src: "/images/gallery5.png",
      alt: "Romantic couple portrait on the beach",
      orientation: "portrait",
    },
    {
      src: "/images/gallery6.png",
      alt: "Outdoor wedding ceremony celebration",
      orientation: "landscape",
    },
  ];

  return (
    <section id="gallery" className="bg-white py-16 lg:py-24 relative">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 relative">
          {/* Gallery Title - Left */}
          <div className="mb-8 md:mb-0">
            <p className="text-2xl text-primary tracking-wider italic font-semibold">
              GALLERY
            </p>
          </div>

          {/* Main Title - Right */}
          <div className="flex-1 md:text-right">
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-primary leading-tight">
              Bali Wedding Gallery — Real Celebrations, Artful Design, and
              Timeless Inspiration
            </h2>
          </div>
        </div>

        {/* Mobile Layout - 2 Columns with Staggered/Offset Layout */}
        <div className="block md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {/* Left Column - starts from top */}
            <div className="space-y-3">
              {/* Image 1 */}
              <div className="relative h-[280px] overflow-hidden group">
                <Image
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Image 2 */}
              <div className="relative h-[280px] overflow-hidden group ">
                <Image
                  src={galleryImages[1].src}
                  alt={galleryImages[1].alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Image 3 */}
              <div className="relative h-[280px] overflow-hidden group">
                <Image
                  src={galleryImages[2].src}
                  alt={galleryImages[2].alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Right Column - starts with offset/padding top */}
            <div className="space-y-3 pt-20">
              {/* Image 4 */}
              <div className="relative h-[280px] overflow-hidden group">
                <Image
                  src={galleryImages[3].src}
                  alt={galleryImages[3].alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Image 5 */}
              <div className="relative h-[280px] overflow-hidden group">
                <Image
                  src={galleryImages[4].src}
                  alt={galleryImages[4].alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Image 6 */}
              <div className="relative h-[280px] overflow-hidden group">
                <Image
                  src={galleryImages[5].src}
                  alt={galleryImages[5].alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original Grid */}
        <div className="hidden md:block">
          <div className="space-y-6">
            {/* Row 1: Landscape + Portrait + Portrait */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto lg:h-[420px]">
              {/* Landscape image spanning 2 columns */}
              <div className="lg:col-span-2">
                <div className="relative h-[420px] overflow-hidden group cursor-pointer">
                  <Image
                    src={galleryImages[0].src}
                    alt={galleryImages[0].alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Portrait image 1 */}
              <div className="lg:col-span-1">
                <div className="relative h-[420px] overflow-hidden group cursor-pointer">
                  <Image
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Portrait image 2 */}
              <div className="lg:col-span-1">
                <div className="relative h-[420px] overflow-hidden group cursor-pointer">
                  <Image
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Row 2: Portrait + Portrait + Landscape */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto lg:h-[420px]">
              {/* Portrait image 1 */}
              <div className="lg:col-span-1">
                <div className="relative h-[420px] overflow-hidden group cursor-pointer">
                  <Image
                    src={galleryImages[3].src}
                    alt={galleryImages[3].alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Portrait image 2 */}
              <div className="lg:col-span-1">
                <div className="relative h-[420px] overflow-hidden group cursor-pointer">
                  <Image
                    src={galleryImages[4].src}
                    alt={galleryImages[4].alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Landscape image spanning 2 columns */}
              <div className="lg:col-span-2">
                <div className="relative h-[420px] overflow-hidden group cursor-pointer">
                  <Image
                    src={galleryImages[5].src}
                    alt={galleryImages[5].alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
