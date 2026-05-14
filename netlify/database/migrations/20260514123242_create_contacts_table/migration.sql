CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"submitted_at" timestamp DEFAULT now()
);
