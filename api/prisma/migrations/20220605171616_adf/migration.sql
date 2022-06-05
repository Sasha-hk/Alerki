/*
  Warnings:

  - Added the required column `ip` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sessions" ADD COLUMN     "ip" VARCHAR(15) NOT NULL;
