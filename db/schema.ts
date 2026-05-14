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
