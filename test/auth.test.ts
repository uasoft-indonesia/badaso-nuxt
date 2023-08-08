import { describe, it, expect } from "vitest";
import { setup, $fetch} from "@nuxt/test-utils";
import { fileURLToPath } from "node:url";

interface TestOptions {
  fixture: string;
  configFile: string;
  server: boolean;
  config: {
    modules: string[][];
    badaso: {
      endpoint: string;
      prefix: string;
      key: string;
    };
  };
}

describe("module", async () => {
   const options: TestOptions = {
     fixture: "fixture",
     configFile: "nuxt.config.js",
     server: true,
     config: {
       modules: [["./src/module.ts"]],
       badaso: {
         endpoint: "http://localhost:8000",
         prefix: "api",
         key: "token",
       },
     },
   };
    await setup(options);
      // await setup({
      //   rootDir: fileURLToPath(new URL("./fixtures/pages/auth", import.meta.url)),
      // });

  it("renders", async () => {
    // Get response to a server-rendered page with `$fetch`.
    const body = await $fetch("/auth");
    // expect(html).toContain("<div>basic</div>");
      expect(body).toContain("@badaso/nuxt");
      expect(body).toContain("http://localhost:8000/api");
      expect(body).toContain('<pre id="register">Request was successful</pre>');
      expect(body).toContain('<pre id="resend">Request was successful</pre>');
      expect(body).toContain('<pre id="login">Request was successful</pre>');
      expect(body).toContain('<pre id="refresh">Request was successful</pre>');
      expect(body).toContain('<pre id="logout">Request was successful</pre>');
      expect(body).toContain('<pre id="forgot">Request was successful</pre>');
  });
});
