import { describe, test, expect } from "vitest";
import { url } from "@nuxt/test-utils";


describe("import vue pages", () => {
  test("normal imports as expected", async () => {
    const cmp = await import("../test/fixtures/pages/crud.vue");
    expect(cmp).toBeDefined();
  });


});
