import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const residents = pgTable("residents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  unit: text("unit").notNull(),
  rent: integer("rent").notNull(),
  status: text("status").notNull().default("active"), // active, late, notice
  leaseExpiry: text("lease_expiry").notNull(),
  lastPayment: text("last_payment"),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  desiredUnit: text("desired_unit").notNull(),
  monthlyIncome: integer("monthly_income").notNull(),
  references: text("references").notNull(),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  submittedAt: text("submitted_at").notNull(),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size").notNull(),
  filePath: text("file_path").notNull(),
  uploadedBy: text("uploaded_by").notNull(),
  uploadedAt: text("uploaded_at").notNull(),
  category: text("category").notNull(), // id, income_proof, lease, notice, etc.
  relatedId: integer("related_id"), // resident_id or application_id
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  units: integer("units").notNull(),
  type: text("type").notNull(), // apartment, house, condo
});

export const insertResidentSchema = createInsertSchema(residents).omit({
  id: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  status: true,
  submittedAt: true,
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  uploadedAt: true,
}).extend({
  relatedId: z.number().nullable().optional(),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

export type InsertResident = z.infer<typeof insertResidentSchema>;
export type Resident = typeof residents.$inferSelect;

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;
