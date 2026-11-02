import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

const makeRouter = () => createRouter({ routeTree, context: { queryClient: new QueryClient() } });

describe("Admin sign-in routing", () => {
  it("serves /admin/login as its own page, outside the protected dashboard", () => {
    const ids = makeRouter()
      .matchRoutes("/admin/login")
      .map((m) => m.routeId);
    expect(ids.at(-1)).toBe("/admin_/login");
    expect(ids).not.toContain("/_authenticated");
  });

  it("keeps /admin behind the sign-in gate", () => {
    const ids = makeRouter()
      .matchRoutes("/admin")
      .map((m) => m.routeId);
    expect(ids).toContain("/_authenticated");
  });

  it("has no public sign-up or sign-in page", () => {
    for (const path of ["/sign-up", "/sign-in"]) {
      const last: string | undefined = makeRouter().matchRoutes(path).at(-1)?.routeId;
      expect([rootRouteId, undefined]).toContain(last);
    }
  });
});
