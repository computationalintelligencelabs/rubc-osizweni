import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const key = url.pathname.split("/").pop();

  if (!key) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const store = getStore("ticket-proofs");
    
    // Attempt to get metadata to find content type
    const meta = await store.getMetadata(key);
    if (!meta) {
      return new Response("Not found", { status: 404 });
    }

    const blob = await store.get(key, { type: "blob" });
    if (!blob) {
      return new Response("Not found", { status: 404 });
    }

    const contentType = String(meta.metadata.contentType || "application/octet-stream");
    const originalName = meta.metadata.originalName || key;

    return new Response(blob, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${originalName}"`,
      }
    });
  } catch (error) {
    console.error("Error retrieving proof of payment:", error);
    return new Response("Internal server error", { status: 500 });
  }
};

export const config: Config = {
  path: "/api/proof/:key",
};
