CREATE TABLE "tickets" (
	"id" serial PRIMARY KEY,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"ticket_type" text NOT NULL,
	"price" integer NOT NULL,
	"proof_of_payment_url" text NOT NULL,
	"submitted_at" timestamp DEFAULT now()
);
