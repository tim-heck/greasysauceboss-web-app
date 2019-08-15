CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "name" VARCHAR (200) NOT NULL,
    "admin" BOOLEAN DEFAULT false
);

CREATE TABLE "products" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(300) NOT NULL,
	"description" TEXT NOT NULL,
	"price_pennies" INT NOT NULL,
    "image_url" VARCHAR(2000),
	"hide" BOOLEAN DEFAULT false
);

CREATE TABLE "orders" (
    "id" SERIAL PRIMARY KEY,
    "order_date" DATE NOT NULL,
	"user_id" INT REFERENCES "user" NOT NULL,
	"total_price_pennies" INT NOT NULL
);

CREATE TABLE "line_items" (
    "id" SERIAL PRIMARY KEY,
    "quantity" INT,
	"order_id" INT REFERENCES orders,
	"product_id" INT REFERENCES products
);

CREATE TABLE "shows" (
    "id" SERIAL PRIMARY KEY,
    "show_date" DATE NOT NULL,
	"location" VARCHAR(1000) NOT NULL,
	"ticket" BOOLEAN DEFAULT false,
    "ticket_url" VARCHAR(2000)
);