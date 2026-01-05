/*
  Warnings:

  - Added the required column `idCategoria` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produtos` ADD COLUMN `idCategoria` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `produtos_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
