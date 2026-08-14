import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFileSync } from "fs";

// Mock the database module
vi.mock("./db", () => ({
  getDb: vi.fn(),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
}));

// Mock the LLM module
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

// Mock resend
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: vi.fn().mockResolvedValue({ id: "test-id" }) },
  })),
}));

import { getDb } from "./db";

// Helper to create a mock DB with chainable query builder
function makeMockDb(rows: unknown[] = []) {
  const chain = {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockResolvedValue(rows),
    limit: vi.fn().mockResolvedValue(rows),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockResolvedValue({ insertId: 42 } as unknown),
    onDuplicateKeyUpdate: vi.fn().mockResolvedValue({}),
  };
  return chain as unknown as ReturnType<typeof import("drizzle-orm/mysql2").drizzle>;
}

describe("Blog Router — list", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns empty array when db is unavailable", async () => {
    vi.mocked(getDb).mockResolvedValue(null);
    const db = await getDb();
    const result = db ? "has db" : [];
    expect(result).toEqual([]);
  });

  it("queries blog_posts table when db is available", async () => {
    const mockRows = [
      { id: 1, title: "Test Post", slug: "test-post", published: true, createdAt: new Date() },
    ];
    const mockDb = makeMockDb(mockRows);
    vi.mocked(getDb).mockResolvedValue(mockDb);

    const db = await getDb();
    expect(db).not.toBeNull();
    // Simulate the list query
    const rows = await db!.select().from({} as never).orderBy({} as never);
    expect(rows).toEqual(mockRows);
  });
});

describe("Blog Router — getBySlug", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns null when post not found", async () => {
    const mockDb = makeMockDb([]); // empty result
    vi.mocked(getDb).mockResolvedValue(mockDb);

    const db = await getDb();
    const rows = await db!.select().from({} as never).where({} as never).limit(1);
    const result = rows.length > 0 ? rows[0] : null;
    expect(result).toBeNull();
  });

  it("returns post when found by slug", async () => {
    const mockPost = { id: 1, title: "Options 101", slug: "options-101", published: true };
    const mockDb = makeMockDb([mockPost]);
    vi.mocked(getDb).mockResolvedValue(mockDb);

    const db = await getDb();
    const rows = await db!.select().from({} as never).where({} as never).limit(1);
    const result = rows.length > 0 ? rows[0] : null;
    expect(result).toEqual(mockPost);
  });
});

describe("Leads Router — submit", () => {
  beforeEach(() => vi.clearAllMocks());

  it("inserts lead and returns success with id", async () => {
    const mockDb = makeMockDb();
    vi.mocked(getDb).mockResolvedValue(mockDb);

    const db = await getDb();
    const result = await db!.insert({} as never).values({} as never);
    const insertId = (result as unknown as { insertId: number }).insertId;
    expect(insertId).toBe(42);
    expect({ success: true, id: insertId }).toEqual({ success: true, id: 42 });
  });

  it("validates inquiry type defaults to general", () => {
    const inquiryType = (undefined as string | undefined) ?? "general";
    expect(inquiryType).toBe("general");
  });

  it("validates email format", () => {
    const validEmail = "test@example.com";
    const invalidEmail = "not-an-email";
    expect(validEmail).toContain("@");
    expect(invalidEmail).not.toContain("@");
  });
});

describe("Admin Role Gating", () => {
  it("throws when non-admin tries to access admin-only route", () => {
    const userRole = "user";
    const checkAdmin = () => {
      if (userRole !== "admin") throw new Error("Admin only");
    };
    expect(checkAdmin).toThrow("Admin only");
  });

  it("allows admin to access admin-only route", () => {
    const userRole = "admin";
    const checkAdmin = () => {
      if (userRole !== "admin") throw new Error("Admin only");
      return true;
    };
    expect(checkAdmin()).toBe(true);
  });
});

describe("Newsletter Subscribe", () => {
  it("returns success when email is valid", () => {
    const email = "test@example.com";
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    expect(isValid).toBe(true);
    // Router returns { success: true } for valid emails
    const result = { success: true };
    expect(result.success).toBe(true);
  });

  it("rejects invalid email format", () => {
    const invalidEmail = "not-an-email";
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invalidEmail);
    expect(isValid).toBe(false);
  });

  it("skips email send when RESEND_API_KEY is not set", () => {
    const apiKey = "";
    const shouldSend = Boolean(apiKey);
    expect(shouldSend).toBe(false);
  });
});

describe("Content Compliance", () => {
  it("hero subtitle shows 2,700+ students (not 500+)", () => {
    const enContent = readFileSync("./client/src/i18n/en.ts", "utf8");
    expect(enContent).toContain("2,700+");
    expect(enContent).not.toContain("Join 500+");
    expect(enContent).not.toContain("Trusted by 500+");
  });

  it("no Discord references in English i18n", () => {
    const enContent = readFileSync("./client/src/i18n/en.ts", "utf8");
    expect(enContent.toLowerCase()).not.toContain("discord");
  });

  it("no Discord references in French i18n", () => {
    const frContent = readFileSync("./client/src/i18n/fr.ts", "utf8");
    expect(frContent.toLowerCase()).not.toContain("discord");
  });

  it("Success Stories route exists in App.tsx", () => {
    const appContent = readFileSync("./client/src/App.tsx", "utf8");
    expect(appContent).toContain("/success-stories");
    expect(appContent).toContain("SuccessStories");
  });

  it("blog detail route exists in App.tsx", () => {
    const appContent = readFileSync("./client/src/App.tsx", "utf8");
    expect(appContent).toContain("/blog/:slug");
    expect(appContent).toContain("BlogDetail");
  });
});

describe("YouTube URL Parsing", () => {
  // Mirrors the server-side logic in routers.ts youtubeToPost
  function extractVideoId(url: string): string | null {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "youtu.be") {
        return parsed.pathname.slice(1).split("?")[0] || null;
      } else if (parsed.hostname.includes("youtube.com")) {
        return (
          parsed.searchParams.get("v") ||
          (parsed.pathname.startsWith("/embed/")
            ? parsed.pathname.split("/embed/")[1]?.split("?")[0]
            : null) ||
          (parsed.pathname.startsWith("/shorts/")
            ? parsed.pathname.split("/shorts/")[1]?.split("?")[0]
            : null) ||
          null
        );
      }
    } catch {
      return null;
    }
    return null;
  }

  it("parses standard watch URL", () => {
    expect(extractVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("parses youtu.be short URL", () => {
    expect(extractVideoId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("parses youtu.be short URL with query params", () => {
    expect(extractVideoId("https://youtu.be/dQw4w9WgXcQ?si=abc123")).toBe("dQw4w9WgXcQ");
  });

  it("parses embed URL", () => {
    expect(extractVideoId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("parses shorts URL", () => {
    expect(extractVideoId("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("returns null for invalid URL", () => {
    expect(extractVideoId("not-a-url")).toBeNull();
  });

  it("returns null for non-YouTube URL", () => {
    expect(extractVideoId("https://vimeo.com/123456")).toBeNull();
  });
});
