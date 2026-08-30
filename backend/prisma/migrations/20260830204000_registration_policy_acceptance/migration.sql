-- AlterTable
ALTER TABLE "User"
ADD COLUMN "constitutionAcceptedAt" TIMESTAMP(3),
ADD COLUMN "constitutionVersion" TEXT,
ADD COLUMN "termsAcceptedAt" TIMESTAMP(3),
ADD COLUMN "termsVersion" TEXT;
