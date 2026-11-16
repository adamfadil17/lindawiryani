import { prisma } from "@/lib";
import bcrypt from "bcryptjs";

// SEED_SCOPE=essentials is the production seed: only the one admin whose email, name and password
// come from the env file (never from this repo). An account with the same email is updated to
// these values, so setting the password again and re-seeding resets it. Without it (local
// development) a default admin is created if missing.
const ESSENTIALS_ONLY = process.env.SEED_SCOPE === "essentials";

async function main() {
  console.log(`🌱 Seeding users${ESSENTIALS_ONLY ? " (essentials only)" : ""}...`);

  if (ESSENTIALS_ONLY) {
    const email = process.env.SEED_ADMIN_EMAIL;
    const password = process.env.SEED_ADMIN_PASSWORD;
    if (!email || !password) {
      throw new Error("SEED_SCOPE=essentials needs SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD");
    }

    const hashed = await bcrypt.hash(password, 12);
    const admin = await prisma.user.upsert({
      where: { email },
      update: { name: process.env.SEED_ADMIN_USERNAME || "admin", password: hashed, role: "admin" },
      create: { name: process.env.SEED_ADMIN_USERNAME || "admin", email, password: hashed, role: "admin" },
    });
    console.log("✅ Admin user ready:", admin.email);
  } else {
    const admin = await prisma.user.upsert({
      where: { email: "admin@lindawiryani.com" },
      update: {},
      create: {
        name: "Admin",
        email: "admin@lindawiryani.com",
        password: await bcrypt.hash("Admin@123", 12),
        role: "admin",
      },
    });
    console.log("✅ Admin user created:", admin.email);
  }

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
