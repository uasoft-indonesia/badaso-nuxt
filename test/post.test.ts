import { describe, it, expect } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils";

interface TestOptions {
  fixture: string;
  configFile: string;
  server: boolean;
  config: {
    badaso: {
      endpoint: string;
      entities:{
        post: boolean;
        content: boolean;
      };
      prefix: string;
    };
  };
}

describe("module", async () => {
  const options: TestOptions = {
    fixture: "fixture",
    configFile: "nuxt.config.js",
    server: true,
    config: {
      badaso: {
        endpoint: "http://localhost:8000",
        entities: {
          post: true,
          content: true,
        },
        prefix: "api",
      },
    },
  };
  await setup(options);

  it("renders", async () => {
    // Get response to a server-rendered page with `$fetch`.
    const body = await $fetch("/post");
     expect(body).toContain("http://localhost:8000/api");
     expect(body).toContain("<pre>Post-Browse: true</pre>");
     expect(body).toContain("<pre>Post-Popular: true</pre>");
     expect(body).toContain("<pre>Post-ReadBySlug: true</pre>");

     expect(body).toContain("<pre>Category-Browse: true</pre>");
     expect(body).toContain("<pre>Category-Read: true</pre>");
     expect(body).toContain("<pre>Category-ReadBySlug: true</pre>");

     expect(body).toContain("<pre>Tag-Browse: true</pre>");
     expect(body).toContain("<pre>Tag-Read: true</pre>");
     expect(body).toContain("<pre>Tag-ReadBySlug: true</pre>");

     expect(body).toContain("<pre>Comment-ReadByPostSlug: true</pre>");
     expect(body).toContain("<pre>Comment-Add: true</pre>");
  });
});
