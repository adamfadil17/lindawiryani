import { prisma } from "@/lib";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding users...");

  const hashedPassword = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || "Admin@123", 12);

  const adminUser = await prisma.user.upsert({
    where: { email: process.env.SEED_ADMIN_EMAIL || "admin@lindawiryani.com" },
    update: {},
    create: {
      name: "Admin",
      email: process.env.SEED_ADMIN_EMAIL || "admin@lindawiryani.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ Admin user created:", adminUser.email);
  console.log("\n🎉 Done!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });