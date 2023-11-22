-- CreateTable

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    "user" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL,
        "email" VARCHAR NOT NULL,
        "password" VARCHAR NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "user_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "company" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "code" VARCHAR NOT NULL,
        "name" VARCHAR NOT NULL,
        "street" VARCHAR NOT NULL,
        "country" VARCHAR NOT NULL,
        "postal_code" VARCHAR NOT NULL,
        "telephone" VARCHAR NOT NULL,
        "nif" VARCHAR NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "company_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "machines" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "company_id" UUID NOT NULL,
        "brand" VARCHAR NOT NULL,
        "model" VARCHAR NOT NULL,
        "serie" VARCHAR NOT NULL,
        "year" INTEGER NOT NULL,
        "watts_electric" INTEGER,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "machines_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "reports" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
        "machine_id" UUID NOT NULL,
        "type_instalation" VARCHAR NOT NULL,
        "type_air_conditioning" VARCHAR NOT NULL,
        "type_intervention" VARCHAR NOT NULL,
        "fluid_existent" VARCHAR NOT NULL,
        "fluid_charged" VARCHAR,
        "fluid_description" VARCHAR,
        "temp_heat" INTEGER,
        "temp_cold" INTEGER,
        "hermetically_sealed" BOOLEAN NOT NULL DEFAULT false,
        "satisfied" BOOLEAN NOT NULL DEFAULT false,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
    );

-- CreateTable

CREATE TABLE
    "type_installation" (
        "id" SERIAL NOT NULL,
        "label" VARCHAR NOT NULL,
        "value" VARCHAR NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- CreateTable

CREATE TABLE
    "type_air_conditioning" (
        "id" SERIAL NOT NULL,
        "label" VARCHAR NOT NULL,
        "value" VARCHAR NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- CreateTable

CREATE TABLE
    "type_intervention" (
        "id" SERIAL NOT NULL,
        "label" VARCHAR NOT NULL,
        "value" VARCHAR NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- CreateTable

CREATE TABLE
    "existent_fluid" (
        "id" SERIAL NOT NULL,
        "label" VARCHAR NOT NULL,
        "value" VARCHAR NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- CreateIndex

CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex

CREATE UNIQUE INDEX "company_code_key" ON "company"("code");

-- CreateIndex

CREATE UNIQUE INDEX "type_installation_id_key" ON "type_installation"("id");

-- CreateIndex

CREATE UNIQUE INDEX "type_air_conditioning_id_key" ON "type_air_conditioning"("id");

-- CreateIndex

CREATE UNIQUE INDEX "type_intervention_id_key" ON "type_intervention"("id");

-- CreateIndex

CREATE UNIQUE INDEX "existent_fluid_id_key" ON "existent_fluid"("id");

-- AddForeignKey

ALTER TABLE "machines"
ADD
    CONSTRAINT "machines_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "reports"
ADD
    CONSTRAINT "reports_machine_id_fkey" FOREIGN KEY ("machine_id") REFERENCES "machines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;