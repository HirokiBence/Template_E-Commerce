/*
  Warnings:

  - You are about to drop the column `stripeCheckoutSessioId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeCheckoutSessionId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_stripeCheckoutSessioId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "stripeCheckoutSessioId",
ADD COLUMN     "stripeCheckoutSessionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeCheckoutSessionId_key" ON "Order"("stripeCheckoutSessionId");
