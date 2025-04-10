/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `unidadMedida` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Presentacion" AS ENUM ('VIDRIO', 'PLANTA', 'EMPAQUETADO');

-- CreateEnum
CREATE TYPE "UnidadMedida" AS ENUM ('GR', 'KG', 'ML', 'UNIDAD');

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "presentacion" "Presentacion",
ADD COLUMN     "unidadMedida" "UnidadMedida" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
