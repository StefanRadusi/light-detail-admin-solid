import type { APIEvent } from "@solidjs/start/server";

export function GET(_event: APIEvent) {
  return Response.json({ status: "ok", timestamp: new Date().toISOString() });
}
