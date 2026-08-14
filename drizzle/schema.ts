import {
  int,
  varchar,
  text,
  mysqlTable,
  timestamp,
  boolean,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  emailVerified: boolean("emailVerified").default(false).notNull(),
  verificationToken: varchar("verificationToken", { length: 255 }),
  verificationTokenExpiry: timestamp("verificationTokenExpiry"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Blog posts / news articles
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: mysqlEnum("category", [
    "market-news",
    "trading-tips",
    "options",
    "investing",
    "portfolio",
    "education",
  ])
    .default("education")
    .notNull(),
  coverImage: varchar("coverImage", { length: 500 }),
  published: boolean("published").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  authorName: varchar("authorName", { length: 255 }).default("Sounia Gill"),
  readTime: int("readTime").default(5),
  tags: text("tags"), // JSON array stored as text
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: text("metaDescription"),
  youtubeUrl: varchar("youtubeUrl", { length: 500 }),
  videoId: varchar("videoId", { length: 255 }),
  pdfUrl: varchar("pdfUrl", { length: 1000 }),
  pdfKey: varchar("pdfKey", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  publishedAt: timestamp("publishedAt"),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// Webinar sessions
export const webinars = mysqlTable("webinars", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  hostName: varchar("hostName", { length: 255 }).default("Sounia Gill"),
  scheduledAt: timestamp("scheduledAt").notNull(),
  durationMinutes: int("durationMinutes").default(90),
  status: mysqlEnum("status", ["upcoming", "live", "completed", "cancelled"])
    .default("upcoming")
    .notNull(),
  registrationUrl: varchar("registrationUrl", { length: 500 }),
  videoUrl: varchar("videoUrl", { length: 500 }), // replay URL
  thumbnailUrl: varchar("thumbnailUrl", { length: 500 }),
  maxAttendees: int("maxAttendees"),
  registeredCount: int("registeredCount").default(0),
  isFree: boolean("isFree").default(true).notNull(),
  price: int("price").default(0), // in cents
  topics: text("topics"), // JSON array
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Webinar = typeof webinars.$inferSelect;
export type InsertWebinar = typeof webinars.$inferInsert;

// Lead generation / contact form submissions
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  inquiryType: mysqlEnum("inquiryType", [
    "masterclass",
    "coaching",
    "portfolio",
    "webinar",
    "stock-market-made-easy",
    "general",
  ])
    .default("general")
    .notNull(),
  message: text("message").notNull(),
  source: varchar("source", { length: 100 }).default("contact-form"),
  status: mysqlEnum("status", ["new", "contacted", "converted", "closed"])
    .default("new")
    .notNull(),
  emailSent: boolean("emailSent").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

// Testimonials
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).default("Trading Student"),
  content: text("content").notNull(),
  rating: int("rating").default(5),
  avatarUrl: varchar("avatarUrl", { length: 500 }),
  featured: boolean("featured").default(false).notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// Newsletter subscribers
export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  subscribed: boolean("subscribed").default(true).notNull(),
  unsubscribeToken: varchar("unsubscribeToken", { length: 255 }).unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;


// Masterclass applications
export const masterclassApplications = mysqlTable("masterclass_applications", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  experienceLevel: mysqlEnum("experienceLevel", ["beginner", "intermediate", "advanced"]).default("beginner").notNull(),
  whyInterested: text("whyInterested"),
  status: mysqlEnum("status", ["new", "contacted", "enrolled", "rejected"]).default("new").notNull(),
  emailSent: boolean("emailSent").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type MasterclassApplication = typeof masterclassApplications.$inferSelect;
export type InsertMasterclassApplication = typeof masterclassApplications.$inferInsert;
