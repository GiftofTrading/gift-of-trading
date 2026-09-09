var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// drizzle/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogPosts: () => blogPosts,
  leads: () => leads,
  masterclassApplications: () => masterclassApplications,
  newsletterSubscribers: () => newsletterSubscribers,
  testimonials: () => testimonials,
  users: () => users,
  webinars: () => webinars
});
import {
  int,
  varchar,
  text,
  mysqlTable,
  timestamp,
  boolean,
  mysqlEnum
} from "drizzle-orm/mysql-core";
var users, blogPosts, webinars, leads, testimonials, newsletterSubscribers, masterclassApplications;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    users = mysqlTable("users", {
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
      lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
    });
    blogPosts = mysqlTable("blog_posts", {
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
        "education"
      ]).default("education").notNull(),
      coverImage: varchar("coverImage", { length: 500 }),
      published: boolean("published").default(false).notNull(),
      featured: boolean("featured").default(false).notNull(),
      authorName: varchar("authorName", { length: 255 }).default("Sounia Gill"),
      readTime: int("readTime").default(5),
      tags: text("tags"),
      // JSON array stored as text
      metaTitle: varchar("metaTitle", { length: 255 }),
      metaDescription: text("metaDescription"),
      youtubeUrl: varchar("youtubeUrl", { length: 500 }),
      videoId: varchar("videoId", { length: 255 }),
      pdfUrl: varchar("pdfUrl", { length: 1e3 }),
      pdfKey: varchar("pdfKey", { length: 500 }),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
      publishedAt: timestamp("publishedAt")
    });
    webinars = mysqlTable("webinars", {
      id: int("id").autoincrement().primaryKey(),
      title: varchar("title", { length: 255 }).notNull(),
      slug: varchar("slug", { length: 255 }).notNull().unique(),
      description: text("description").notNull(),
      hostName: varchar("hostName", { length: 255 }).default("Sounia Gill"),
      scheduledAt: timestamp("scheduledAt").notNull(),
      durationMinutes: int("durationMinutes").default(90),
      status: mysqlEnum("status", ["upcoming", "live", "completed", "cancelled"]).default("upcoming").notNull(),
      registrationUrl: varchar("registrationUrl", { length: 500 }),
      videoUrl: varchar("videoUrl", { length: 500 }),
      // replay URL
      thumbnailUrl: varchar("thumbnailUrl", { length: 500 }),
      maxAttendees: int("maxAttendees"),
      registeredCount: int("registeredCount").default(0),
      isFree: boolean("isFree").default(true).notNull(),
      price: int("price").default(0),
      // in cents
      topics: text("topics"),
      // JSON array
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    leads = mysqlTable("leads", {
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
        "general"
      ]).default("general").notNull(),
      message: text("message").notNull(),
      source: varchar("source", { length: 100 }).default("contact-form"),
      status: mysqlEnum("status", ["new", "contacted", "converted", "closed"]).default("new").notNull(),
      emailSent: boolean("emailSent").default(false).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    testimonials = mysqlTable("testimonials", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      role: varchar("role", { length: 255 }).default("Trading Student"),
      content: text("content").notNull(),
      rating: int("rating").default(5),
      avatarUrl: varchar("avatarUrl", { length: 500 }),
      featured: boolean("featured").default(false).notNull(),
      published: boolean("published").default(true).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    newsletterSubscribers = mysqlTable("newsletter_subscribers", {
      id: int("id").autoincrement().primaryKey(),
      email: varchar("email", { length: 320 }).notNull().unique(),
      name: varchar("name", { length: 255 }),
      subscribed: boolean("subscribed").default(true).notNull(),
      unsubscribeToken: varchar("unsubscribeToken", { length: 255 }).unique(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    masterclassApplications = mysqlTable("masterclass_applications", {
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
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
  }
});

// server/adminCredentials.ts
var adminCredentials_exports = {};
__export(adminCredentials_exports, {
  ADMIN_CREDENTIALS: () => ADMIN_CREDENTIALS,
  isValidAdminEmail: () => isValidAdminEmail,
  verifyAdminCredentials: () => verifyAdminCredentials
});
import bcrypt from "bcryptjs";
async function verifyAdminCredentials(email, password) {
  const admin = ADMIN_CREDENTIALS.find(
    (cred) => cred.email.toLowerCase() === email.toLowerCase()
  );
  if (!admin) {
    return false;
  }
  return bcrypt.compare(password, admin.passwordHash);
}
function isValidAdminEmail(email) {
  return ADMIN_CREDENTIALS.some(
    (cred) => cred.email.toLowerCase() === email.toLowerCase()
  );
}
var ADMIN_CREDENTIALS;
var init_adminCredentials = __esm({
  "server/adminCredentials.ts"() {
    "use strict";
    ADMIN_CREDENTIALS = [
      {
        email: "Giftoftrading@gmail.com",
        // Password: G!ft0fTr@d!ng$$$
        // Hash generated with: bcrypt.hashSync("G!ft0fTr@d!ng$$$", 10)
        passwordHash: "$2b$10$pAo0z8IysP3XnVGvnJr0C.IgcceinWA3EIcL.epWVFUvn/m1MJYHa"
      },
      {
        email: "hgdhami77@gmail.com",
        // Password: G!ft0fTr@d!ng$$$
        // Hash generated with: bcrypt.hashSync("G!ft0fTr@d!ng$$$", 10)
        passwordHash: "$2b$10$pAo0z8IysP3XnVGvnJr0C.IgcceinWA3EIcL.epWVFUvn/m1MJYHa"
      }
    ];
  }
});

// server/api.ts
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/db.ts
init_schema();
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
};

// server/db.ts
init_schema();
var _db = null;
async function getDb() {
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
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      console.log(`[DB] Setting admin role for owner: ${user.openId}`);
      values.role = "admin";
      updateSet.role = "admin";
    } else {
      console.log(`[DB] User openId: ${user.openId}, ENV.ownerOpenId: ${ENV.ownerOpenId}`);
      values.role = "user";
      updateSet.role = "user";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    if (sessionCookie?.startsWith("admin-session:")) {
      const email = sessionCookie.substring("admin-session:".length);
      const { isValidAdminEmail: isValidAdminEmail2 } = await Promise.resolve().then(() => (init_adminCredentials(), adminCredentials_exports));
      if (isValidAdminEmail2(email)) {
        const adminUser = {
          id: 999999,
          // Admin session ID
          openId: "admin-session-" + email,
          name: email.split("@")[0],
          email,
          role: "admin",
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          lastSignedIn: /* @__PURE__ */ new Date(),
          loginMethod: "admin-login",
          verificationToken: null,
          verificationTokenExpiry: null
        };
        return adminUser;
      }
    }
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt,
      role: user.role
      // Preserve the existing role
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app2) {
  app2.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const user = await getUserByOpenId(userInfo.openId);
      const isAdmin = user?.role === "admin";
      const isEmailVerified = user?.emailVerified ?? false;
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      let redirectPath = "/";
      if (!isEmailVerified) {
        redirectPath = "/verify-email";
      } else if (isAdmin) {
        redirectPath = "/admin";
      }
      res.redirect(302, redirectPath);
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/storageProxy.ts
function registerStorageProxy(app2) {
  app2.get("/manus-storage/*", async (req, res) => {
    const key = req.params[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }
    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/"
      );
      forgeUrl.searchParams.set("path", key);
      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` }
      });
      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }
      const { url } = await forgeResp.json();
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }
      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/storage.ts
function getForgeConfig() {
  const forgeUrl = ENV.forgeApiUrl;
  const forgeKey = ENV.forgeApiKey;
  if (!forgeUrl || !forgeKey) {
    throw new Error(
      "Storage config missing: set BUILT_IN_FORGE_API_URL and BUILT_IN_FORGE_API_KEY"
    );
  }
  return { forgeUrl: forgeUrl.replace(/\/+$/, ""), forgeKey };
}
function normalizeKey(relKey) {
  return relKey.replace(/^\/+/, "");
}
function appendHashSuffix(relKey) {
  const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const lastDot = relKey.lastIndexOf(".");
  if (lastDot === -1) return `${relKey}_${hash}`;
  return `${relKey.slice(0, lastDot)}_${hash}${relKey.slice(lastDot)}`;
}
async function storagePut(relKey, data, contentType = "application/octet-stream") {
  const { forgeUrl, forgeKey } = getForgeConfig();
  const key = appendHashSuffix(normalizeKey(relKey));
  const presignUrl = new URL("v1/storage/presign/put", forgeUrl + "/");
  presignUrl.searchParams.set("path", key);
  const presignResp = await fetch(presignUrl, {
    headers: { Authorization: `Bearer ${forgeKey}` }
  });
  if (!presignResp.ok) {
    const msg = await presignResp.text().catch(() => presignResp.statusText);
    throw new Error(`Storage presign failed (${presignResp.status}): ${msg}`);
  }
  const { url: s3Url } = await presignResp.json();
  if (!s3Url) throw new Error("Forge returned empty presign URL");
  const blob = typeof data === "string" ? new Blob([data], { type: contentType }) : new Blob([data], { type: contentType });
  const uploadResp = await fetch(s3Url, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: blob
  });
  if (!uploadResp.ok) {
    throw new Error(`Storage upload to S3 failed (${uploadResp.status})`);
  }
  return { key, url: `/manus-storage/${key}` };
}

// server/routers.ts
import { z as z2 } from "zod/v4";

// server/_core/llm.ts
var ensureArray = (value) => Array.isArray(value) ? value : [value];
var normalizeContentPart = (part) => {
  if (typeof part === "string") {
    return { type: "text", text: part };
  }
  if (part.type === "text") {
    return part;
  }
  if (part.type === "image_url") {
    return part;
  }
  if (part.type === "file_url") {
    return part;
  }
  throw new Error("Unsupported message content part");
};
var normalizeMessage = (message) => {
  const { role, name, tool_call_id } = message;
  if (role === "tool" || role === "function") {
    const content = ensureArray(message.content).map((part) => typeof part === "string" ? part : JSON.stringify(part)).join("\n");
    return {
      role,
      name,
      tool_call_id,
      content
    };
  }
  const contentParts = ensureArray(message.content).map(normalizeContentPart);
  if (contentParts.length === 1 && contentParts[0].type === "text") {
    return {
      role,
      name,
      content: contentParts[0].text
    };
  }
  return {
    role,
    name,
    content: contentParts
  };
};
var normalizeToolChoice = (toolChoice, tools) => {
  if (!toolChoice) return void 0;
  if (toolChoice === "none" || toolChoice === "auto") {
    return toolChoice;
  }
  if (toolChoice === "required") {
    if (!tools || tools.length === 0) {
      throw new Error(
        "tool_choice 'required' was provided but no tools were configured"
      );
    }
    if (tools.length > 1) {
      throw new Error(
        "tool_choice 'required' needs a single tool or specify the tool name explicitly"
      );
    }
    return {
      type: "function",
      function: { name: tools[0].function.name }
    };
  }
  if ("name" in toolChoice) {
    return {
      type: "function",
      function: { name: toolChoice.name }
    };
  }
  return toolChoice;
};
var resolveApiUrl = () => ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0 ? `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions` : "https://forge.manus.im/v1/chat/completions";
var assertApiKey = () => {
  if (!ENV.forgeApiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
};
var normalizeResponseFormat = ({
  responseFormat,
  response_format,
  outputSchema,
  output_schema
}) => {
  const explicitFormat = responseFormat || response_format;
  if (explicitFormat) {
    if (explicitFormat.type === "json_schema" && !explicitFormat.json_schema?.schema) {
      throw new Error(
        "responseFormat json_schema requires a defined schema object"
      );
    }
    return explicitFormat;
  }
  const schema = outputSchema || output_schema;
  if (!schema) return void 0;
  if (!schema.name || !schema.schema) {
    throw new Error("outputSchema requires both name and schema");
  }
  return {
    type: "json_schema",
    json_schema: {
      name: schema.name,
      schema: schema.schema,
      ...typeof schema.strict === "boolean" ? { strict: schema.strict } : {}
    }
  };
};
async function invokeLLM(params) {
  assertApiKey();
  const {
    messages,
    tools,
    toolChoice,
    tool_choice,
    outputSchema,
    output_schema,
    responseFormat,
    response_format
  } = params;
  const payload = {
    model: "gemini-2.5-flash",
    messages: messages.map(normalizeMessage)
  };
  if (tools && tools.length > 0) {
    payload.tools = tools;
  }
  const normalizedToolChoice = normalizeToolChoice(
    toolChoice || tool_choice,
    tools
  );
  if (normalizedToolChoice) {
    payload.tool_choice = normalizedToolChoice;
  }
  payload.max_tokens = 32768;
  payload.thinking = {
    "budget_tokens": 128
  };
  const normalizedResponseFormat = normalizeResponseFormat({
    responseFormat,
    response_format,
    outputSchema,
    output_schema
  });
  if (normalizedResponseFormat) {
    payload.response_format = normalizedResponseFormat;
  }
  const response = await fetch(resolveApiUrl(), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${ENV.forgeApiKey}`
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM invoke failed: ${response.status} ${response.statusText} \u2013 ${errorText}`
    );
  }
  return await response.json();
}

// server/routers.ts
init_schema();
import { Resend } from "resend";
import { eq as eq2, desc, and } from "drizzle-orm";
init_adminCredentials();
import { TRPCError as TRPCError3 } from "@trpc/server";
var RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
var OWNER_EMAIL = process.env.OWNER_EMAIL ?? "giftoftrading@gmail.com";
var RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Gift of Trading <noreply@giftoftrading.com>";
var RESEND_FALLBACK_TO = process.env.RESEND_FALLBACK_TO ?? "giftoftrading@gmail.com";
async function sendEmailSafely(params) {
  if (!RESEND_API_KEY) {
    console.warn("[Resend] RESEND_API_KEY not set \u2014 skipping email send");
    return null;
  }
  const resend = new Resend(RESEND_API_KEY);
  const primaryFrom = params.from ?? RESEND_FROM_EMAIL;
  const primaryTo = params.to ?? [OWNER_EMAIL];
  try {
    const result = await resend.emails.send({
      from: primaryFrom,
      to: primaryTo,
      replyTo: params.replyTo,
      subject: params.subject,
      html: params.html
    });
    if (result.error) {
      console.error("[Resend Primary Error]:", result.error);
      const isDomainUnverified = result.error.statusCode === 403 || result.error.message?.toLowerCase().includes("not verified") || result.error.message?.toLowerCase().includes("verify a domain");
      if (isDomainUnverified) {
        const fallbackTo = params.to ?? [RESEND_FALLBACK_TO];
        console.warn(
          `[Resend] Domain verification pending for ${primaryFrom}. Falling back to onboarding@resend.dev -> ${fallbackTo.join(", ")}...`
        );
        const fallbackResult = await resend.emails.send({
          from: "Gift of Trading <onboarding@resend.dev>",
          to: fallbackTo,
          replyTo: params.replyTo,
          subject: `[Notification] ${params.subject}`,
          html: params.html
        });
        if (fallbackResult.error) {
          console.error("[Resend Fallback Error]:", fallbackResult.error);
        } else {
          console.log("[Resend] Successfully sent via fallback:", fallbackResult.data?.id);
        }
        return fallbackResult;
      }
      return result;
    }
    console.log("[Resend] Email sent successfully:", result.data?.id);
    return result;
  } catch (err) {
    console.error("[Resend] Unexpected exception during send:", err);
    return null;
  }
}
var ownerOnlyProcedure = adminProcedure.use(({ ctx, next }) => {
  if (ctx.user.openId !== ENV.ownerOpenId) {
    throw new TRPCError3({ code: "FORBIDDEN", message: "Only the owner can perform this action" });
  }
  return next({ ctx });
});
async function sendLeadEmail(lead) {
  const inquiryLabels = {
    "stock-market-made-easy": "Stock Market Made Easy",
    "webinar": "Webinar",
    "general": "General Inquiry"
  };
  const inquiryLabel = inquiryLabels[lead.inquiryType] ?? lead.inquiryType;
  await sendEmailSafely({
    to: ["giftoftrading@gmail.com"],
    replyTo: lead.email,
    subject: `New Lead: ${lead.firstName} ${lead.lastName ?? ""} \u2014 ${inquiryLabel}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #0a1628; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <img src="https://static.wixstatic.com/media/19e04d_5b3916fa625b4272b213150378dc7cd2~mv2.png/v1/fill/w_198,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GIFT-LOGO.png" alt="Gift of Trading" style="height: 48px;" />
        </div>
        <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #0a1628; margin-top: 0;">New Lead Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${lead.firstName} ${lead.lastName ?? ""}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${lead.email}" style="color: #c9a84c;">${lead.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; color: #111827;">${lead.phone ?? "Not provided"}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Inquiry</td><td style="padding: 8px 0;"><span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-size: 13px;">${inquiryLabel}</span></td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 6px; border-left: 3px solid #c9a84c;">
            <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">${lead.message.replace(/\n/g, "<br/>")}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">Submitted via giftoftrading.com contact form. Reply directly to this email to respond to ${lead.firstName}.</p>
        </div>
      </div>
    `
  });
}
var blogRouter = router({
  list: publicProcedure.input(z2.object({ published: z2.boolean().optional() }).optional()).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return [];
    if (input?.published !== void 0) {
      const rows2 = await db.select().from(blogPosts).where(eq2(blogPosts.published, input.published)).orderBy(desc(blogPosts.createdAt));
      return rows2;
    }
    const rows = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    return rows;
  }),
  getBySlug: publicProcedure.input(z2.object({ slug: z2.string() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return null;
    const rows = await db.select().from(blogPosts).where(and(eq2(blogPosts.slug, input.slug), eq2(blogPosts.published, true))).limit(1);
    return rows.length > 0 ? rows[0] : null;
  }),
  create: protectedProcedure.input(
    z2.object({
      title: z2.string().min(1),
      slug: z2.string().min(1),
      excerpt: z2.string().optional(),
      content: z2.string().optional().default(""),
      category: z2.enum(["market-news", "trading-tips", "options", "investing", "portfolio", "education"]).optional(),
      published: z2.boolean().optional(),
      featured: z2.boolean().optional(),
      readTime: z2.number().optional(),
      metaDescription: z2.string().optional(),
      youtubeUrl: z2.string().optional(),
      videoId: z2.string().optional(),
      pdfUrl: z2.string().optional(),
      pdfKey: z2.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    console.log("[Blog] Create endpoint called");
    console.log("[Blog] User:", ctx.user);
    const db = await getDb();
    if (!db) {
      console.error("[Blog] Database not available");
      throw new Error("Database not available");
    }
    if (ctx.user?.role !== "admin") {
      console.error("[Blog] User is not admin:", ctx.user?.role);
      throw new Error("Admin only");
    }
    console.log("[Blog] Creating post:", input.title);
    const result = await db.insert(blogPosts).values({
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      content: input.content,
      category: input.category ?? "education",
      published: input.published ?? false,
      featured: input.featured ?? false,
      readTime: input.readTime ?? 5,
      metaDescription: input.metaDescription,
      youtubeUrl: input.youtubeUrl,
      videoId: input.videoId,
      pdfUrl: input.pdfUrl ?? null,
      pdfKey: input.pdfKey ?? null
    });
    const insertId = result.insertId;
    console.log("[Blog] Post created successfully:", insertId);
    return { success: true, id: insertId };
  }),
  update: protectedProcedure.input(
    z2.object({
      id: z2.number(),
      title: z2.string().min(1),
      slug: z2.string().min(1),
      excerpt: z2.string().optional(),
      content: z2.string().optional().default(""),
      category: z2.enum(["market-news", "trading-tips", "options", "investing", "portfolio", "education"]).optional(),
      published: z2.boolean().optional(),
      featured: z2.boolean().optional(),
      readTime: z2.number().optional(),
      metaDescription: z2.string().optional(),
      youtubeUrl: z2.string().optional(),
      videoId: z2.string().optional(),
      pdfUrl: z2.string().optional(),
      pdfKey: z2.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    if (ctx.user?.role !== "admin") throw new Error("Admin only");
    const { id, ...fields } = input;
    await db.update(blogPosts).set({
      title: fields.title,
      slug: fields.slug,
      excerpt: fields.excerpt,
      content: fields.content,
      category: fields.category ?? "education",
      published: fields.published ?? false,
      featured: fields.featured ?? false,
      readTime: fields.readTime ?? 5,
      metaDescription: fields.metaDescription,
      youtubeUrl: fields.youtubeUrl,
      videoId: fields.videoId,
      pdfUrl: fields.pdfUrl ?? null,
      pdfKey: fields.pdfKey ?? null
    }).where(eq2(blogPosts.id, id));
    return { success: true };
  }),
  uploadPdf: protectedProcedure.input(
    z2.object({
      fileName: z2.string().min(1),
      fileBase64: z2.string().min(1),
      // base64-encoded PDF bytes
      postId: z2.number().optional()
      // if provided, immediately attach to this post
    })
  ).mutation(async ({ input, ctx }) => {
    if (ctx.user?.role !== "admin") throw new Error("Admin only");
    const buffer = Buffer.from(input.fileBase64, "base64");
    const safeName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `blog-pdfs/${Date.now()}-${safeName}`;
    const { url } = await storagePut(key, buffer, "application/pdf");
    if (input.postId) {
      const db = await getDb();
      if (db) {
        await db.update(blogPosts).set({ pdfUrl: url, pdfKey: key }).where(eq2(blogPosts.id, input.postId));
      }
    }
    return { url, key };
  }),
  delete: protectedProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input, ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    if (ctx.user?.role !== "admin") throw new Error("Admin only");
    await db.delete(blogPosts).where(eq2(blogPosts.id, input.id));
    return { success: true };
  })
});
var webinarsRouter = router({
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const rows = await db.select().from(webinars).orderBy(desc(webinars.scheduledAt));
    return rows;
  }),
  create: protectedProcedure.input(
    z2.object({
      title: z2.string().min(1),
      slug: z2.string().min(1),
      description: z2.string().min(1),
      scheduledAt: z2.date(),
      durationMinutes: z2.number().optional(),
      isFree: z2.boolean().optional(),
      maxAttendees: z2.number().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    if (ctx.user?.role !== "admin") throw new Error("Admin only");
    const result = await db.insert(webinars).values({
      title: input.title,
      slug: input.slug,
      description: input.description,
      scheduledAt: input.scheduledAt,
      durationMinutes: input.durationMinutes ?? 90,
      isFree: input.isFree ?? true,
      maxAttendees: input.maxAttendees ?? 100
    });
    return { success: true, id: result.insertId };
  }),
  update: protectedProcedure.input(
    z2.object({
      id: z2.number(),
      title: z2.string().min(1).optional(),
      slug: z2.string().min(1).optional(),
      description: z2.string().optional(),
      scheduledAt: z2.date().optional(),
      durationMinutes: z2.number().optional(),
      isFree: z2.boolean().optional(),
      maxAttendees: z2.number().optional(),
      registrationUrl: z2.string().optional(),
      videoUrl: z2.string().optional(),
      hostName: z2.string().optional(),
      status: z2.enum(["upcoming", "live", "completed", "cancelled"]).optional(),
      topics: z2.string().optional(),
      price: z2.number().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    if (ctx.user?.role !== "admin") throw new Error("Admin only");
    const { id, ...fields } = input;
    await db.update(webinars).set(fields).where(eq2(webinars.id, id));
    return { success: true };
  }),
  delete: protectedProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input, ctx }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    if (ctx.user?.role !== "admin") throw new Error("Admin only");
    await db.delete(webinars).where(eq2(webinars.id, input.id));
    return { success: true };
  })
});
var leadsRouter = router({
  submit: publicProcedure.input(
    z2.object({
      firstName: z2.string().min(1),
      lastName: z2.string().optional(),
      email: z2.string().email(),
      phone: z2.string().optional(),
      inquiryType: z2.enum(["stock-market-made-easy", "webinar", "general"]).optional(),
      message: z2.string().min(1)
    })
  ).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const result = await db.insert(leads).values({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      inquiryType: input.inquiryType ?? "general",
      message: input.message
    });
    await sendLeadEmail({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      inquiryType: input.inquiryType ?? "general",
      message: input.message
    });
    return { success: true, id: result.insertId };
  }),
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    if (ctx.user?.role !== "admin") throw new Error("Admin only");
    const rows = await db.select().from(leads).orderBy(desc(leads.createdAt));
    return rows;
  })
});
var testimonialsRouter = router({
  list: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const rows = await db.select().from(testimonials).where(eq2(testimonials.published, true)).orderBy(desc(testimonials.createdAt));
    return rows;
  })
});
var aiRouter = router({
  youtubeToPost: protectedProcedure.input(z2.object({ youtubeUrl: z2.string().url() })).mutation(async ({ input, ctx }) => {
    if (ctx.user?.role !== "admin") throw new Error("Admin only");
    let videoId = null;
    try {
      const parsed2 = new URL(input.youtubeUrl);
      if (parsed2.hostname === "youtu.be") {
        videoId = parsed2.pathname.slice(1).split("?")[0] || null;
      } else if (parsed2.hostname.includes("youtube.com")) {
        videoId = parsed2.searchParams.get("v") || (parsed2.pathname.startsWith("/embed/") ? parsed2.pathname.split("/embed/")[1]?.split("?")[0] : null) || (parsed2.pathname.startsWith("/shorts/") ? parsed2.pathname.split("/shorts/")[1]?.split("?")[0] : null) || null;
      }
    } catch {
      throw new Error("Invalid YouTube URL");
    }
    if (!videoId) throw new Error("Invalid YouTube URL \u2014 please use a standard YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)");
    const prompt = `
        You are a financial education content expert. Analyze this YouTube video and create a blog post.
        
        Video URL: ${input.youtubeUrl}
        Video ID: ${videoId}
        
        Generate a blog post with:
        1. An engaging title (max 60 chars)
        2. A URL-friendly slug (lowercase, hyphens)
        3. A brief excerpt (max 160 chars)
        4. Full blog post content (markdown format, 800-1200 words)
        5. Estimated read time in minutes
        6. Meta description (max 160 chars)
        
        Return as JSON with keys: title, slug, excerpt, content, readTime, metaDescription, youtubeUrl, videoId
      `;
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are a financial education content expert who creates blog posts from YouTube videos."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "blog_post",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              slug: { type: "string" },
              excerpt: { type: "string" },
              content: { type: "string" },
              readTime: { type: "number" },
              metaDescription: { type: "string" },
              youtubeUrl: { type: "string" },
              videoId: { type: "string" }
            },
            required: ["title", "slug", "excerpt", "content", "readTime", "metaDescription", "youtubeUrl", "videoId"]
          }
        }
      }
    });
    const rawContent = response.choices[0]?.message.content;
    if (!rawContent) throw new Error("Failed to generate blog post");
    const content = typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent);
    const parsed = JSON.parse(content);
    return {
      title: parsed.title,
      slug: parsed.slug,
      excerpt: parsed.excerpt,
      content: parsed.content,
      readTime: parsed.readTime,
      metaDescription: parsed.metaDescription,
      youtubeUrl: input.youtubeUrl,
      videoId
    };
  })
});
var YOUTUBE_CHANNEL_ID = "UCEkK2eeKkEITYBAEYSkFHbQ";
var youtubeRouter = router({
  latestVideos: publicProcedure.query(async () => {
    try {
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
      const res = await fetch(rssUrl, { signal: AbortSignal.timeout(8e3) });
      if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
      const xml = await res.text();
      const entries = [];
      const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
      let match;
      while ((match = entryRegex.exec(xml)) !== null && entries.length < 6) {
        const block = match[1];
        const videoIdMatch = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        const titleMatch = block.match(/<media:title>([^<]*)<\/media:title>/) || block.match(/<title>([^<]*)<\/title>/);
        const thumbMatch = block.match(/<media:thumbnail url="([^"]+)"/);
        const pubMatch = block.match(/<published>([^<]+)<\/published>/);
        const linkMatch = block.match(/<link rel="alternate" href="([^"]+)"/);
        if (videoIdMatch && titleMatch) {
          const videoId = videoIdMatch[1].trim();
          const title = titleMatch[1].replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
          const thumbnail = thumbMatch ? thumbMatch[1] : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
          const publishedAt = pubMatch ? pubMatch[1] : (/* @__PURE__ */ new Date()).toISOString();
          const url = linkMatch ? linkMatch[1] : `https://www.youtube.com/watch?v=${videoId}`;
          entries.push({ id: videoId, title, url, thumbnail, publishedAt });
        }
      }
      return entries;
    } catch (err) {
      console.warn("[YouTube] Failed to fetch RSS feed:", err);
      return [];
    }
  })
});
var newsletterRouter = router({
  subscribe: publicProcedure.input(z2.object({ email: z2.string().email(), name: z2.string().optional() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
    const { newsletterSubscribers: newsletterSubscribers3 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    try {
      const existing = await db.select().from(newsletterSubscribers3).where(eq2(newsletterSubscribers3.email, input.email)).limit(1);
      if (existing.length) {
        return { success: true, message: "Already subscribed" };
      }
      await db.insert(newsletterSubscribers3).values({
        email: input.email,
        name: input.name || null,
        subscribed: true
      });
    } catch (err) {
      console.warn("[Newsletter] Failed to save subscriber:", err);
    }
    await sendEmailSafely({
      subject: `New Newsletter Subscriber: ${input.email}`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #0a1628; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <img src="https://static.wixstatic.com/media/19e04d_5b3916fa625b4272b213150378dc7cd2~mv2.png/v1/fill/w_198,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GIFT-LOGO.png" alt="Gift of Trading" style="height: 48px;" />
          </div>
          <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0a1628; margin-top: 0;">New Newsletter Subscriber</h2>
            <p style="color: #374151;"><strong>${input.name || input.email}</strong> (${input.email}) has subscribed to your newsletter.</p>
            <p style="font-size: 12px; color: #9ca3af;">Subscribed via giftoftrading.com</p>
          </div>
        </div>`
    });
    return { success: true };
  }),
  list: ownerOnlyProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const { newsletterSubscribers: newsletterSubscribers3 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    return db.select().from(newsletterSubscribers3).orderBy(desc(newsletterSubscribers3.createdAt));
  })
});
var usersRouter = router({
  list: ownerOnlyProcedure.input(z2.object({ search: z2.string().optional() }).optional()).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return [];
    const rows = await db.select().from(users).orderBy(desc(users.createdAt));
    if (input?.search) {
      const searchLower = input.search.toLowerCase();
      return rows.filter(
        (u) => u.email?.toLowerCase().includes(searchLower) || u.name?.toLowerCase().includes(searchLower)
      );
    }
    return rows;
  }),
  promoteToAdmin: ownerOnlyProcedure.input(z2.object({ userId: z2.number() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
    const user = await db.select().from(users).where(eq2(users.id, input.userId)).limit(1);
    if (!user.length) throw new TRPCError3({ code: "NOT_FOUND", message: "User not found" });
    await db.update(users).set({ role: "admin" }).where(eq2(users.id, input.userId));
    return { success: true };
  }),
  demoteFromAdmin: ownerOnlyProcedure.input(z2.object({ userId: z2.number() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
    const user = await db.select().from(users).where(eq2(users.id, input.userId)).limit(1);
    if (!user.length) throw new TRPCError3({ code: "NOT_FOUND", message: "User not found" });
    if (user[0].openId === ENV.ownerOpenId) {
      throw new TRPCError3({ code: "FORBIDDEN", message: "Cannot demote the owner" });
    }
    await db.update(users).set({ role: "user" }).where(eq2(users.id, input.userId));
    return { success: true };
  }),
  createAdmin: ownerOnlyProcedure.input(z2.object({ email: z2.string().email(), name: z2.string().optional() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
    const existingUser = await db.select().from(users).where(eq2(users.email, input.email)).limit(1);
    if (existingUser.length) {
      throw new TRPCError3({ code: "CONFLICT", message: "User with this email already exists" });
    }
    const tempOpenId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await db.insert(users).values({
      openId: tempOpenId,
      email: input.email,
      name: input.name || null,
      role: "admin",
      loginMethod: null,
      lastSignedIn: /* @__PURE__ */ new Date()
    });
    return { success: true, email: input.email };
  })
});
var masterclassRouter = router({
  submit: publicProcedure.input(z2.object({
    firstName: z2.string().min(1),
    lastName: z2.string().optional(),
    email: z2.string().email(),
    phone: z2.string().min(7),
    experienceLevel: z2.enum(["beginner", "intermediate", "advanced"]),
    whyInterested: z2.string().min(1)
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
    const { masterclassApplications: masterclassApplications2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    try {
      await db.insert(masterclassApplications2).values({
        firstName: input.firstName,
        lastName: input.lastName || null,
        email: input.email,
        phone: input.phone,
        experienceLevel: input.experienceLevel,
        whyInterested: input.whyInterested || null,
        status: "new"
      });
    } catch (err) {
      console.warn("[Masterclass] Failed to save application:", err);
    }
    await sendEmailSafely({
      replyTo: input.email,
      subject: `New Masterclass Application: ${input.firstName} ${input.lastName || ""} \u2014 ${input.experienceLevel}`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><div style="background: #0a1628; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;"><img src="https://static.wixstatic.com/media/19e04d_5b3916fa625b4272b213150378dc7cd2~mv2.png/v1/fill/w_198,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GIFT-LOGO.png" alt="Gift of Trading" style="height: 48px;" /></div><div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;"><h2 style="color: #0a1628; margin-top: 0;">New Masterclass Application</h2><table style="width: 100%; border-collapse: collapse;"><tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${input.firstName} ${input.lastName || ""}</td></tr><tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${input.email}" style="color: #c9a84c;">${input.email}</a></td></tr><tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; color: #111827;">${input.phone}</td></tr><tr><td style="padding: 8px 0; color: #6b7280;">Experience</td><td style="padding: 8px 0;"><span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-size: 13px;">${input.experienceLevel}</span></td></tr></table><p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">Submitted via giftoftrading.com masterclass application form. Reply directly to this email to respond to ${input.firstName}.</p></div></div>`
    });
    return { success: true, message: "Application submitted successfully. Someone will reach out to schedule a Zoom call." };
  }),
  list: ownerOnlyProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const { masterclassApplications: masterclassApplications2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
    return db.select().from(masterclassApplications2).orderBy(desc(masterclassApplications2.createdAt));
  })
});
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    login: publicProcedure.input(z2.object({ email: z2.string().email(), password: z2.string() })).mutation(async ({ input, ctx }) => {
      const isValidEmail = isValidAdminEmail(input.email);
      if (!isValidEmail) {
        throw new TRPCError3({ code: "FORBIDDEN", message: "Invalid credentials" });
      }
      const isValidPassword = await verifyAdminCredentials(input.email, input.password);
      if (!isValidPassword) {
        throw new TRPCError3({ code: "FORBIDDEN", message: "Invalid credentials" });
      }
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, `admin-session:${input.email}`, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1e3 });
      return { success: true, email: input.email };
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    }),
    sendVerificationEmail: protectedProcedure.mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      if (!ctx.user.email) {
        throw new TRPCError3({ code: "BAD_REQUEST", message: "User email not found" });
      }
      const verificationCode = Math.floor(1e5 + Math.random() * 9e5).toString();
      const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1e3);
      await db.update(users).set({ verificationToken: verificationCode, verificationTokenExpiry: expiryTime }).where(eq2(users.id, ctx.user.id));
      await sendEmailSafely({
        to: [ctx.user.email],
        subject: "Verify Your Email - Gift of Trading",
        html: `<p>Your email verification code is: <strong>${verificationCode}</strong></p><p>This code expires in 24 hours.</p>`
      });
      return { success: true, message: "Verification code sent to your email" };
    }),
    verifyEmail: protectedProcedure.input(z2.object({ code: z2.string() })).mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      const user = await db.select().from(users).where(eq2(users.id, ctx.user.id)).limit(1);
      if (!user.length) throw new TRPCError3({ code: "NOT_FOUND", message: "User not found" });
      const userData = user[0];
      if (!userData.verificationToken || !userData.verificationTokenExpiry) {
        throw new TRPCError3({ code: "BAD_REQUEST", message: "No verification code requested" });
      }
      if (/* @__PURE__ */ new Date() > userData.verificationTokenExpiry) {
        throw new TRPCError3({ code: "BAD_REQUEST", message: "Verification code expired" });
      }
      if (userData.verificationToken !== input.code) {
        throw new TRPCError3({ code: "BAD_REQUEST", message: "Invalid verification code" });
      }
      await db.update(users).set({ emailVerified: true, verificationToken: null, verificationTokenExpiry: null }).where(eq2(users.id, ctx.user.id));
      return { success: true, message: "Email verified successfully" };
    })
  }),
  blog: blogRouter,
  webinars: webinarsRouter,
  leads: leadsRouter,
  testimonials: testimonialsRouter,
  ai: aiRouter,
  youtube: youtubeRouter,
  newsletter: newsletterRouter,
  masterclass: masterclassRouter,
  users: usersRouter
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/api.ts
var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
registerStorageProxy(app);
registerOAuthRoutes(app);
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext
  })
);
var api_default = app;
export {
  api_default as default
};
