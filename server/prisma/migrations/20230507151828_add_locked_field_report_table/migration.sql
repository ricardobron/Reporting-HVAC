-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "locked" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "temp_heat" SET DEFAULT 0,
ALTER COLUMN "temp_cold" SET DEFAULT 0;
