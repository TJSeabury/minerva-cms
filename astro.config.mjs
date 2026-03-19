import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import nodeAdapter from "@astrojs/node";

export default defineConfig( {
  integrations: [react()],
  adapter: nodeAdapter( { mode: "standalone" } ),
  // Keep it simple for the MVP.
  vite: {
    ssr: {
      noExternal: ["@astrojs/react"],
    },
  },
} );

