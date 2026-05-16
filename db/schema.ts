import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const tickets = pgTable("tickets", {
  id: serial().primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  ticketType: text("ticket_type").notNull(),
  price: integer("price").notNull(),
  proofOfPaymentUrl: text("proof_of_payment_url").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const registrations = pgTable("registrations", {
  id: serial().primaryKey(),
  formName: text("form_name").notNull(),
  payload: text("payload").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
});
