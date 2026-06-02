import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

const PDF_ROOT = path.join(process.cwd(), "data", "pdf");

function badRequest(message: string, status = 400) {
  return new Response(message, { status });
}

async function downloadGoogleDriveFile(fileId: string) {
  const base = new URL("https://drive.google.com/uc");
  base.searchParams.set("export", "download");
  base.searchParams.set("id", fileId);

  // Google Drive sometimes returns an interstitial HTML page with a confirm token.
  const first = await fetch(base, { redirect: "follow" });
  const contentType = first.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return first;

  const html = await first.text();
  const confirmMatch =
    html.match(/confirm=([0-9A-Za-z_-]+)/) ??
    html.match(/name="confirm"\s+value="([^"]+)"/);
  const confirm = confirmMatch?.[1];
  if (!confirm) {
    // If we can't find a token, return the original HTML response for debugging.
    return new Response(html, {
      status: 502,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  const confirmed = new URL("https://drive.google.com/uc");
  confirmed.searchParams.set("export", "download");
  confirmed.searchParams.set("confirm", confirm);
  confirmed.searchParams.set("id", fileId);

  return fetch(confirmed, { redirect: "follow" });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const kind = url.searchParams.get("kind"); // "magazine" | "gazette" | "newsletter" | "drive"
  const fileParam = url.searchParams.get("file");
  const nameParam = url.searchParams.get("name");

  if (!kind || !fileParam) {
    return badRequest("Missing required query params: kind, file");
  }

  if (
    kind !== "magazine" &&
    kind !== "gazette" &&
    kind !== "newsletter" &&
    kind !== "drive"
  ) {
    return badRequest("Invalid kind");
  }

  // Google Drive proxy download (use file id, not a filename/path).
  if (kind === "drive") {
    const fileId = decodeURIComponent(fileParam).trim();
    if (!/^[0-9A-Za-z_-]{10,}$/.test(fileId)) {
      return badRequest("Invalid drive file id");
    }

    const driveRes = await downloadGoogleDriveFile(fileId);
    if (!driveRes.ok || !driveRes.body) {
      return badRequest("Failed to download file", 502);
    }

    const downloadName = (nameParam ? decodeURIComponent(nameParam) : undefined) ?? "download.pdf";
    const safeName = downloadName.replace(/[\\/\r\n"]/g, "_");
    const size = driveRes.headers.get("content-length");

    return new Response(driveRes.body, {
      headers: {
        "Content-Type": "application/pdf",
        ...(size ? { "Content-Length": size } : {}),
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Cache-Control": "no-store",
      },
    });
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

