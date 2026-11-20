import "dotenv/config";

import { createMailer, emailDisabled } from "../src/lib/email";

/**
 * Verify that Gmail SMTP credentials work from the current host.
 *
 * Run locally and again on the Contabo VPS (task 6.3 / 8.x):
 *   npm run email:verify
 *
 * The VPS must be able to open an outbound connection to smtp.gmail.com
 * (587/465). Port 25 is commonly blocked by VPS providers; Gmail uses 587/465.
 */
async function main() {
  if (emailDisabled()) {
    console.log("EMAIL_DISABLED=true — skipping SMTP verification.");
    return;
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error("EMAIL_USER / EMAIL_APP_PASSWORD are not set.");
  }

  const transporter = createMailer();
  await transporter.verify();
  console.log(`SMTP OK for ${process.env.EMAIL_USER}`);
}

main().catch((error) => {
  console.error("SMTP verification failed:", error);
  process.exitCode = 1;
});
