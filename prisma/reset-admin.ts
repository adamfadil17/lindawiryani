import bcrypt from "bcryptjs";

import { prisma } from "../src/lib/prisma";

/**
 * Rotate (or create) the admin account from ADMIN_EMAIL / ADMIN_PASSWORD.
 *
 * Usage:
 *   ADMIN_EMAIL=hello@example.com ADMIN_PASSWORD='a-strong-password' npm run db:reset-admin
 *
 * Use this after seeding, or if the old `Admin@123` account was ever created.
 */
async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Admin";

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set (see .env.example).",
    );
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new Error(`ADMIN_EMAIL is not a valid email address: ${email}`);
  }

  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters long.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: "admin",
      // Invalidates every JWT issued before this rotation (task 1.5).
      token_version: { increment: 1 },
      ...(process.env.ADMIN_NAME ? { name } : {}),
    },
    create: {
      name,
      email,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log(`Admin credentials updated for: ${admin.email}`);
  console.log("Existing sessions (JWTs) stay valid until they expire or JWT_SECRET changes.");
}

main()
  .catch((error) => {
    console.error("Reset admin error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
