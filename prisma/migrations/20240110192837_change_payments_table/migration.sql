/*
  Warnings:

  - A unique constraint covering the columns `[orderNumber]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'processing';

-- CreateIndex
CREATE UNIQUE INDEX "payments_orderNumber_key" ON "payments"("orderNumber");
