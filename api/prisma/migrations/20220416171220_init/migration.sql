-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('client', 'master');

-- CreateTable
CREATE TABLE "MasterWeekendDays" (
    "id" TEXT NOT NULL,
    "monday" BOOLEAN NOT NULL DEFAULT false,
    "tuesday" BOOLEAN NOT NULL DEFAULT false,
    "wednesday" BOOLEAN NOT NULL DEFAULT false,
    "thursday" BOOLEAN NOT NULL DEFAULT false,
    "friday" BOOLEAN NOT NULL DEFAULT false,
    "saturday" BOOLEAN NOT NULL DEFAULT true,
    "sunday" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterWeekendDays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterProfiile" (
    "id" TEXT NOT NULL,
    "biography" VARCHAR(100),
    "weekendDaysID" VARCHAR(36),
    "startTime" INTEGER,
    "endTime" INTEGER,
    "delayBefore" INTEGER,
    "delayAfter" INTEGER,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterProfiile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientProfiile" (
    "id" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientProfiile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPictures" (
    "id" TEXT NOT NULL,
    "picture" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "email" VARCHAR(319) NOT NULL,
    "firstName" VARCHAR(30),
    "lastName" VARCHAR(30),
    "phoneNumber" VARCHAR(13),
    "password" VARCHAR(60),
    "profileType" "ProfileType" NOT NULL DEFAULT E'client',
    "pictureID" VARCHAR(36),
    "clientID" VARCHAR(36) NOT NULL,
    "masterID" VARCHAR(36),
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthData" (
    "id" TEXT NOT NULL,
    "userID" VARCHAR(36) NOT NULL,
    "deviceName" VARCHAR(30) NOT NULL,
    "refreshToken" VARCHAR(1024) NOT NULL,
    "googleAccessToken" VARCHAR(1024),
    "googleRefreshToken" VARCHAR(1026),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterServices" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "locationLat" DOUBLE PRECISION NOT NULL,
    "locationLng" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "serviceID" VARCHAR(36) NOT NULL,
    "masterID" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterSchedule" (
    "id" TEXT NOT NULL,
    "masterID" VARCHAR(36) NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "weekend" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "masterServiceID" VARCHAR(36) NOT NULL,
    "masterID" VARCHAR(36) NOT NULL,
    "clientID" VARCHAR(36) NOT NULL,
    "clientConfirm" BOOLEAN NOT NULL DEFAULT true,
    "masterConfirm" BOOLEAN NOT NULL DEFAULT false,
    "masterCancel" BOOLEAN NOT NULL DEFAULT false,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "actorID" VARCHAR(36) NOT NULL,
    "notifierID" VARCHAR(36) NOT NULL,
    "entity" INTEGER NOT NULL,
    "entityType" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MasterProfiile_weekendDaysID_key" ON "MasterProfiile"("weekendDaysID");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phoneNumber_key" ON "Users"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Users_masterID_key" ON "Users"("masterID");

-- CreateIndex
CREATE UNIQUE INDEX "Users_clientID_key" ON "Users"("clientID");

-- CreateIndex
CREATE UNIQUE INDEX "Users_pictureID_key" ON "Users"("pictureID");

-- CreateIndex
CREATE UNIQUE INDEX "AuthData_userID_key" ON "AuthData"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Services_available_key" ON "Services"("available");

-- CreateIndex
CREATE UNIQUE INDEX "MasterServices_masterID_key" ON "MasterServices"("masterID");

-- CreateIndex
CREATE UNIQUE INDEX "MasterServices_serviceID_key" ON "MasterServices"("serviceID");

-- CreateIndex
CREATE UNIQUE INDEX "MasterSchedule_masterID_key" ON "MasterSchedule"("masterID");

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_masterID_key" ON "Appointments"("masterID");

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_clientID_key" ON "Appointments"("clientID");

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_masterServiceID_key" ON "Appointments"("masterServiceID");

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_actorID_key" ON "Notifications"("actorID");

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_notifierID_key" ON "Notifications"("notifierID");

-- AddForeignKey
ALTER TABLE "MasterProfiile" ADD CONSTRAINT "MasterProfiile_weekendDaysID_fkey" FOREIGN KEY ("weekendDaysID") REFERENCES "MasterWeekendDays"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_masterID_fkey" FOREIGN KEY ("masterID") REFERENCES "MasterProfiile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_clientID_fkey" FOREIGN KEY ("clientID") REFERENCES "ClientProfiile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_pictureID_fkey" FOREIGN KEY ("pictureID") REFERENCES "UserPictures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthData" ADD CONSTRAINT "AuthData_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterServices" ADD CONSTRAINT "MasterServices_masterID_fkey" FOREIGN KEY ("masterID") REFERENCES "MasterProfiile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterServices" ADD CONSTRAINT "MasterServices_serviceID_fkey" FOREIGN KEY ("serviceID") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterSchedule" ADD CONSTRAINT "MasterSchedule_masterID_fkey" FOREIGN KEY ("masterID") REFERENCES "MasterProfiile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_masterID_fkey" FOREIGN KEY ("masterID") REFERENCES "MasterProfiile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_clientID_fkey" FOREIGN KEY ("clientID") REFERENCES "ClientProfiile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_masterServiceID_fkey" FOREIGN KEY ("masterServiceID") REFERENCES "MasterServices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_actorID_fkey" FOREIGN KEY ("actorID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_notifierID_fkey" FOREIGN KEY ("notifierID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
