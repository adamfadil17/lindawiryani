// import { prisma } from "@/lib";

// import bcrypt from "bcryptjs";

// async function main() {
//   console.log("🌱 Seeding database...");

//   // ── Users ──────────────────────────────────────────────
//   const hashedPassword = await bcrypt.hash("Admin@123", 12);

//   const adminUser = await prisma.user.upsert({
//     where: { email: "admin@lindawiryani.com" },
//     update: {},
//     create: {
//       name: "Admin",
//       email: "admin@lindawiryani.com",
//       password: hashedPassword,
//       role: "admin",
//     },
//   });
//   console.log("✅ Admin user created:", adminUser.email);

//   // ── Wedding Themes ─────────────────────────────────────
//   const themes = await Promise.all([
//     prisma.weddingTheme.upsert({
//       where: { slug: "modern-elegant" },
//       update: {},
//       create: {
//         name: "Modern Elegant",
//         slug: "modern-elegant",
//         description: "Clean lines and contemporary aesthetics for the modern couple.",
//         og_image: null,
//       },
//     }),
//     prisma.weddingTheme.upsert({
//       where: { slug: "rustic-garden" },
//       update: {},
//       create: {
//         name: "Rustic Garden",
//         slug: "rustic-garden",
//         description: "Lush greenery, wood accents, and natural beauty.",
//         og_image: null,
//       },
//     }),
//     prisma.weddingTheme.upsert({
//       where: { slug: "grand-ballroom" },
//       update: {},
//       create: {
//         name: "Grand Ballroom",
//         slug: "grand-ballroom",
//         description: "Opulent and timeless luxury for grand celebrations.",
//         og_image: null,
//       },
//     }),
//   ]);
//   console.log(`✅ ${themes.length} wedding themes seeded`);

//   // ── Locations ──────────────────────────────────────────
//   const jakartaParent = await prisma.location.upsert({
//     where: { slug: "jakarta" },
//     update: {},
//     create: {
//       name: "Jakarta",
//       slug: "jakarta",
//     },
//   });

//   const baliParent = await prisma.location.upsert({
//     where: { slug: "bali" },
//     update: {},
//     create: {
//       name: "Bali",
//       slug: "bali",
//     },
//   });

//   const jakartaChild = await prisma.location.upsert({
//     where: { slug: "jakarta-selatan" },
//     update: {},
//     create: {
//       name: "Jakarta Selatan",
//       slug: "jakarta-selatan",
//       parent_id: jakartaParent.id,
//     },
//   });

//   const baliChild = await prisma.location.upsert({
//     where: { slug: "ubud-bali" },
//     update: {},
//     create: {
//       name: "Ubud",
//       slug: "ubud-bali",
//       parent_id: baliParent.id,
//     },
//   });
//   console.log("✅ Locations seeded");

//   // ── Venues ─────────────────────────────────────────────
//   const venues = await Promise.all([
//     prisma.venue.upsert({
//       where: { slug: "the-mansion-jakarta" },
//       update: {},
//       create: {
//         name: "The Mansion Jakarta",
//         slug: "the-mansion-jakarta",
//         venue_type: "ballroom",
//         location_id: jakartaChild.id,
//         wedding_theme_id: themes[2].id, // Grand Ballroom
//         description: "A magnificent ballroom in the heart of South Jakarta.",
//         content: "Full venue details here...",
//         featured_image: "https://placehold.co/1200x800?text=The+Mansion+Jakarta",
//         is_featured: true,
//         og_image: "https://placehold.co/1200x630?text=The+Mansion+Jakarta",
//       },
//     }),
//     prisma.venue.upsert({
//       where: { slug: "jungle-retreat-ubud" },
//       update: {},
//       create: {
//         name: "Jungle Retreat Ubud",
//         slug: "jungle-retreat-ubud",
//         venue_type: "outdoor",
//         location_id: baliChild.id,
//         wedding_theme_id: themes[1].id, // Rustic Garden
//         description: "Surrounded by Bali's lush tropical jungle.",
//         content: "Full venue details here...",
//         featured_image: "https://placehold.co/1200x800?text=Jungle+Retreat+Ubud",
//         is_featured: true,
//         og_image: "https://placehold.co/1200x630?text=Jungle+Retreat+Ubud",
//       },
//     }),
//   ]);
//   console.log(`✅ ${venues.length} venues seeded`);

//   // ── Services ───────────────────────────────────────────
//   const services = await Promise.all([
//     prisma.service.upsert({
//       where: { slug: "full-wedding-planning" },
//       update: {},
//       create: {
//         title: "Full Wedding Planning",
//         slug: "full-wedding-planning",
//         description: "End-to-end wedding planning from concept to execution.",
//         content: "Our full wedding planning service covers everything...",
//         featured_image: "https://placehold.co/800x600?text=Full+Planning",
//         is_active: true,
//       },
//     }),
//     prisma.service.upsert({
//       where: { slug: "wedding-decoration" },
//       update: {},
//       create: {
//         title: "Wedding Decoration",
//         slug: "wedding-decoration",
//         description: "Exquisite floral arrangements and decorative styling.",
//         content: "Our decoration team transforms any space...",
//         featured_image: "https://placehold.co/800x600?text=Decoration",
//         is_active: true,
//       },
//     }),
//     prisma.service.upsert({
//       where: { slug: "wedding-photography" },
//       update: {},
//       create: {
//         title: "Wedding Photography",
//         slug: "wedding-photography",
//         description: "Capturing your most precious moments.",
//         content: "Our photographers bring stories to life...",
//         featured_image: "https://placehold.co/800x600?text=Photography",
//         is_active: true,
//       },
//     }),
//   ]);
//   console.log(`✅ ${services.length} services seeded`);

//   // ── Wedding Experiences ────────────────────────────────
//   const experiences = await Promise.all([
//     prisma.weddingExperience.upsert({
//       where: { slug: "intimate-ceremony" },
//       update: {},
//       create: {
//         title: "Intimate Ceremony",
//         slug: "intimate-ceremony",
//         description: "A small, personal celebration for close family and friends.",
//         content: "Perfect for couples who value intimacy...",
//         featured_image: "https://placehold.co/800x600?text=Intimate+Ceremony",
//       },
//     }),
//     prisma.weddingExperience.upsert({
//       where: { slug: "grand-celebration" },
//       update: {},
//       create: {
//         title: "Grand Celebration",
//         slug: "grand-celebration",
//         description: "A lavish event for guests to remember forever.",
//         content: "An unforgettable experience on a grand scale...",
//         featured_image: "https://placehold.co/800x600?text=Grand+Celebration",
//       },
//     }),
//   ]);
//   console.log(`✅ ${experiences.length} wedding experiences seeded`);

//   // ── Galleries ──────────────────────────────────────────
//   const gallery = await prisma.gallery.upsert({
//     where: { id: "00000000-0000-0000-0000-000000000001" },
//     update: {},
//     create: {
//       id: "00000000-0000-0000-0000-000000000001",
//       image_url: ["https://placehold.co/800x600?text=Gallery+1", "https://placehold.co/800x600?text=Gallery+2"],
//       sort_order: 1,
//       category: "wedding",
//     },
//   });
//   console.log("✅ Gallery seeded");

//   // ── Images ─────────────────────────────────────────────
//   await Promise.all([
//     prisma.image.create({
//       data: {
//         portfolio_id: gallery.id,
//         venue_id: venues[0].id,
//         image_url: { url: "https://placehold.co/1200x800?text=Venue+Image+1", alt: "The Mansion Jakarta" },
//         sort_order: 1,
//       },
//     }),
//     prisma.image.create({
//       data: {
//         venue_id: venues[1].id,
//         theme_id: themes[1].id,
//         image_url: { url: "https://placehold.co/1200x800?text=Venue+Image+2", alt: "Jungle Retreat Ubud" },
//         sort_order: 1,
//       },
//     }),
//     prisma.image.create({
//       data: {
//         service_id: services[0].id,
//         image_url: { url: "https://placehold.co/800x600?text=Service+Image", alt: "Full Wedding Planning" },
//         sort_order: 1,
//       },
//     }),
//     prisma.image.create({
//       data: {
//         wedding_experiences_id: experiences[0].id,
//         image_url: { url: "https://placehold.co/800x600?text=Experience+Image", alt: "Intimate Ceremony" },
//         sort_order: 1,
//       },
//     }),
//   ]);
//   console.log("✅ Images seeded");

//   // ── Inquiries ──────────────────────────────────────────
//   await prisma.inquiry.create({
//     data: {
//       name: "Siti Rahayu",
//       email: "siti@example.com",
//       phone: "+6281234567890",
//       wedding_date: new Date("2025-06-15"),
//       venue_preference: "The Mansion Jakarta",
//       theme_preference: "Modern Elegant",
//       service_interest: "Full Wedding Planning",
//       message: "We are interested in booking a venue for June 2025.",
//       status: "pending",
//     },
//   });
//   console.log("✅ Sample inquiry seeded");

//   console.log("\n🎉 Database seeding complete!");
// }

// main()
//   .catch((e) => {
//     console.error("❌ Seeding error:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
