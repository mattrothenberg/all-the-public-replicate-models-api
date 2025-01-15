// @ts-ignore
import stats from "all-the-public-replicate-models/stats";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "*",
  }),
);

app.get("/stats/:owner/:model", (c) => {
  const { model, owner } = c.req.param();
  if (!model || !owner) return c.text("Not found", 404);

  const nwo = `${owner}/${model}`;
  const match = stats[nwo];

  if (!match) return c.text("Not found", 404);

  return c.json(match || {}, 200);
});

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
