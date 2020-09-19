CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "address" text,
  "cpf" int,
  "rg" int
);

CREATE TABLE "agencies" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "manager" text,
  "services" text,
  "address_id" int
);

CREATE TABLE "addresses" (
  "id" SERIAL PRIMARY KEY,
  "street" text,
  "neighborhood" text,
  "city" text,
  "state" text,
  "number" int
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "color" text,
  "chassi" text,
  "door" int,
  "models_id" int
);

CREATE TABLE "models" (
  "id" SERIAL PRIMARY KEY,
  "brand" text,
  "model" text,
  "manufacturer" text
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "date" timestamp,
  "customer_id" int,
  "agency_id" int,
  "days" int
);

CREATE TABLE "cars_orders" (
  "cars_id" int,
  "orders_id" int
);

ALTER TABLE "cars_orders" ADD FOREIGN KEY ("cars_id") REFERENCES "cars" ("id");

ALTER TABLE "cars_orders" ADD FOREIGN KEY ("orders_id") REFERENCES "orders" ("id");

ALTER TABLE "agencies" ADD FOREIGN KEY ("address_id") REFERENCES "addresses" ("id");

ALTER TABLE "cars" ADD FOREIGN KEY ("models_id") REFERENCES "models" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("agency_id") REFERENCES "agencies" ("id");
