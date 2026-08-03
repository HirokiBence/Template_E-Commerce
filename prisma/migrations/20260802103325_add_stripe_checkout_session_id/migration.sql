/*
  Warnings:

  - A unique constraint covering the columns `[stripeCheckoutSessioId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "stripeCheckoutSessioId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeCheckoutSessioId_key" ON "Order"("stripeCheckoutSessioId");
