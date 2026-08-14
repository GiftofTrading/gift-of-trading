import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("managed preview Vite configuration", () => {
  it("disables middleware-mode HMR to avoid localhost WebSocket connections", () => {
    const source = fs.readFileSync(path.resolve(import.meta.dirname, "vite.ts"), "utf8");

    expect(source).toMatch(/middlewareMode:\s*true/);
    expect(source).toMatch(/hmr:\s*false/);
    expect(source).toMatch(/transformIndexHtml\(url, template\)\)\.replace/);
    expect(source).toContain("\\@vite\\/client");
    expect(source).not.toMatch(/hmr:\s*\{\s*server\s*\}/);
  });
});
