/*
  Warnings:

  - You are about to drop the column `orderId` on the `payments` table. All the data in the column will be lost.
  - Added the required column `orderNumber` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_orderId_fkey";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "orderId",
ADD COLUMN     "orderNumber" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderNumber_fkey" FOREIGN KEY ("orderNumber") REFERENCES "orders"("orderNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
