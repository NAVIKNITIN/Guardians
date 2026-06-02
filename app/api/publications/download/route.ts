import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

const PDF_ROOT = path.join(process.cwd(), "data", "pdf");

function badRequest(message: string, status = 400) {
  return new Response(message, { status });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const kind = url.searchParams.get("kind"); // "magazine" | "gazette" | "newsletter"
  const fileParam = url.searchParams.get("file");

  if (!kind || !fileParam) {
    return badRequest("Missing required query params: kind, file");
  }

  if (kind !== "magazine" && kind !== "gazette" && kind !== "newsletter") {
    return badRequest("Invalid kind");
  }

  // Prevent path traversal: allow a single filename only.
  const fileName = decodeURIComponent(fileParam);
  if (
    fileName.includes("..") ||
    fileName.includes("/") ||
    fileName.includes("\\") ||
    fileName.trim().length === 0
  ) {
    return badRequest("Invalid file name");
  }

  const absPath = path.join(PDF_ROOT, kind, fileName);

  try {
    const info = await stat(absPath);
    if (!info.isFile()) return badRequest("Not found", 404);

    const stream = createReadStream(absPath);

    return new Response(stream as unknown as ReadableStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(info.size),
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return badRequest("Not found", 404);
  }
}

