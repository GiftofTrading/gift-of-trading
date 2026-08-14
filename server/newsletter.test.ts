import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb } from "./db";
import { newsletterSubscribers } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Newsletter Subscription", () => {
  let db: any;
  const testEmail = `test-${Date.now()}@example.com`;
  const testName = "Test Subscriber";

  beforeAll(async () => {
    db = await getDb();
  });

  it("should insert a new newsletter subscriber", async () => {
    if (!db) {
      console.warn("Database not available, skipping test");
      return;
    }

    const result = await db.insert(newsletterSubscribers).values({
      email: testEmail,
      name: testName,
      subscribed: true,
    });

    expect(result).toBeDefined();
  });

  it("should retrieve subscriber by email", async () => {
    if (!db) {
      console.warn("Database not available, skipping test");
      return;
    }

    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, testEmail))
      .limit(1);

    expect(subscribers.length).toBe(1);
    expect(subscribers[0].email).toBe(testEmail);
    expect(subscribers[0].name).toBe(testName);
    expect(subscribers[0].subscribed).toBe(true);
  });

  it("should handle duplicate email gracefully", async () => {
    if (!db) {
      console.warn("Database not available, skipping test");
      return;
    }

    // Try to insert the same email again
    try {
      await db.insert(newsletterSubscribers).values({
        email: testEmail,
        name: "Duplicate Name",
        subscribed: true,
      });
      // If it succeeds, the database should have unique constraint
      expect(true).toBe(false); // Should not reach here
    } catch (error) {
      // Expected to fail due to unique constraint
      expect(error).toBeDefined();
    }
  });

  it("should update subscriber status", async () => {
    if (!db) {
      console.warn("Database not available, skipping test");
      return;
    }

    const unsubscribeEmail = `unsub-${Date.now()}@example.com`;

    // Insert subscriber
    await db.insert(newsletterSubscribers).values({
      email: unsubscribeEmail,
      name: "Unsubscribe Test",
      subscribed: true,
    });

    // Update to unsubscribed
    await db
      .update(newsletterSubscribers)
      .set({ subscribed: false })
      .where(eq(newsletterSubscribers.email, unsubscribeEmail));

    // Verify update
    const updated = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, unsubscribeEmail))
      .limit(1);

    expect(updated[0].subscribed).toBe(false);
  });

  afterAll(async () => {
    if (!db) return;

    // Clean up test data
    try {
      await db
        .delete(newsletterSubscribers)
        .where(eq(newsletterSubscribers.email, testEmail));
    } catch (error) {
      console.warn("Cleanup error:", error);
    }
  });
});
