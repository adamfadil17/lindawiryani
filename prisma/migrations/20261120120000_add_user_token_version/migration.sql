-- Task 1.5: token revocation support.
-- Existing JWTs have no `ver` claim and are treated as version 0.
ALTER TABLE "users" ADD COLUMN "token_version" INTEGER NOT NULL DEFAULT 0;
