/*
  Warnings:

  - You are about to drop the column `orderId` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderNumber]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderNumber` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'processing';

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_orderId_fkey";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "orderId",
ADD COLUMN     "orderNumber" TEXT NOT NULL,
ADD COLUMN     "reason" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "payments_orderNumber_key" ON "payments"("orderNumber");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderNumber_fkey" FOREIGN KEY ("orderNumber") REFERENCES "orders"("orderNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
