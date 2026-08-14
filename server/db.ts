import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      console.log("[DB] Connecting to MySQL database");
      _db = drizzle(process.env.DATABASE_URL);
      console.log("[DB] MySQL connection established");
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      console.log(`[DB] Setting admin role for owner: ${user.openId}`);
      values.role = 'admin';
      updateSet.role = 'admin';
    } else {
      console.log(`[DB] User openId: ${user.openId}, ENV.ownerOpenId: ${ENV.ownerOpenId}`);
      values.role = 'user';
      updateSet.role = 'user';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

import { InsertMasterclassApplication, masterclassApplications } from "../drizzle/schema";

export async function createMasterclassApplication(data: InsertMasterclassApplication) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(masterclassApplications).values(data);
  return result;
}

export async function getMasterclassApplications() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(masterclassApplications).orderBy((t) => t.createdAt);
}

export async function getMasterclassApplicationById(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.select().from(masterclassApplications).where(eq(masterclassApplications.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateMasterclassApplication(id: number, data: Partial<InsertMasterclassApplication>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.update(masterclassApplications).set(data).where(eq(masterclassApplications.id, id));
}
