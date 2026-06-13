/**
 * Example: bulk-import projects from Excel via POST /projects.
 *
 * Do not put secrets or machine-specific paths in this file.
 * Copy to a gitignored local path and run with env vars:
 *
 *   mkdir -p scripts/local
 *   cp scripts/import-remaining-projects.example.mjs scripts/local/import-remaining-projects.mjs
 *
 *   GUARDIANS_API_BASE_URL="https://your-api-host/api" \
 *   GUARDIANS_EXCEL_PATH="/absolute/path/to/Guardians Inside Page Details.xlsx" \
 *   GUARDIANS_STOP_AFTER_NAME="Cloud Infinity Premium Villas" \
 *   node scripts/local/import-remaining-projects.mjs
 *
 * Requires: npm install xlsx (dev dependency or npx)
 */
import XLSX from "xlsx";

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const API_BASE = requireEnv("GUARDIANS_API_BASE_URL").replace(/\/$/, "");
const EXCEL_PATH = requireEnv("GUARDIANS_EXCEL_PATH");
const STOP_AFTER_NAME =
  process.env.GUARDIANS_STOP_AFTER_NAME?.trim() ||
  "Cloud Infinity Premium Villas";

const AMENITY_RULES = [
  { id: 1, name: "Gymnasium", re: /\bgym\b|fitness centre|fitness center/i },
  {
    id: 2,
    name: "High Tech Security",
    re: /security|cctv|surveillance|access control/i,
  },
  {
    id: 3,
    name: "Multipurpose Hall",
    re: /multipurpose|banquet|party hall|cafeteria/i,
  },
  {
    id: 4,
    name: "Kids Play Area",
    re: /kids(?:'|\u2019)?\s*play|play area|playground/i,
  },
  {
    id: 5,
    name: "Rooftop Lounge",
    re: /rooftop|terrace garden|lounge|break out/i,
  },
  {
    id: 6,
    name: "Landscaped Garden",
    re: /landscape|garden|yoga|jogging|sit-out/i,
  },
  { id: 7, name: "High Speed Elevators", re: /elevator|lift/i },
  { id: 8, name: "Latest Fire Safety System", re: /fire safety/i },
  { id: 9, name: "Valet", re: /valet/i },
];

function excelSerialToCompletionDate(serial) {
  const n = Number(serial);
  if (!Number.isFinite(n) || n <= 0) return null;
  const date = new Date(Math.round((n - 25569) * 86400 * 1000));
  if (Number.isNaN(date.getTime())) return null;
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}-01`;
}

function isCompletedFromCompletionDate(completionDate) {
  if (!completionDate) return false;
  const match = /^(\d{4})-(\d{2})/.exec(completionDate);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const now = new Date();
  const projectIndex = year * 12 + (month - 1);
  const nowIndex = now.getFullYear() * 12 + now.getMonth();
  return projectIndex < nowIndex;
}

function parseArea(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  const m = s.match(/[\d,.]+/);
  return m ? m[0].replace(/,/g, "") : null;
}

function parseConnectivity(raw) {
  const text = String(raw ?? "").trim();
  if (!text || /^https?:\/\//i.test(text)) return [];

  return text
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      let place = line;
      let walking_time = null;
      let driving_time = null;

      const walkMatch = line.match(/(.+?)\s*[-–]\s*walk\s*[-–]?\s*(\d+)/i);
      const carMatch = line.match(
        /(.+?)\s*[-–]\s*(?:car|drive)\s*[-–]?\s*(\d+)/i,
      );
      const minsOnly = line.match(/^(.+?)\s*[-–]\s*(\d+)\s*mins?\s*$/i);
      const minShort = line.match(/^(.+?)\s*[-–]\s*(\d+)\s*Min(?:ute)?s?\s*$/i);

      if (walkMatch) {
        place = walkMatch[1].trim();
        walking_time = walkMatch[2];
      } else if (carMatch) {
        place = carMatch[1].trim();
        driving_time = carMatch[2];
      } else if (minsOnly || minShort) {
        const m = minsOnly ?? minShort;
        place = m[1].trim();
        driving_time = m[2];
      }

      return {
        place_name: place,
        country: "India",
        city: " ",
        state: " ",
        address: " ",
        latitude: " ",
        longitude: " ",
        walking_time: walking_time ? String(walking_time) : " ",
        driving_time: driving_time ? String(driving_time) : " ",
      };
    });
}

function parseAmenities(raw) {
  const text = String(raw ?? "").trim();
  if (!text || /^https?:\/\//i.test(text) || text.includes(".com")) {
    return [];
  }

  const matched = [];
  const seen = new Set();
  for (const rule of AMENITY_RULES) {
    if (rule.re.test(text) && !seen.has(rule.id)) {
      seen.add(rule.id);
      matched.push({ name: rule.name, amenities_image_id: rule.id });
    }
  }
  return matched;
}

function rowToPayload(row, header) {
  const get = (label) => {
    const idx = header.indexOf(label);
    return idx >= 0 ? row[idx] : "";
  };

  const name = String(get("Name of the Project") ?? "").trim();
  const rera = String(get("RERA Number") ?? "").trim() || null;
  const builder = String(get("Builder Name") ?? "").trim() || null;
  const area = parseArea(get("Area"));
  const bhkType = String(get("Type") ?? "").trim();
  const location = String(get("Location") ?? "").trim();
  const description =
    String(get("Short description of property (30-50) words") ?? "").trim() ||
    null;
  const completionRaw = get("Project completed in");
  const completion_date =
    typeof completionRaw === "number"
      ? excelSerialToCompletionDate(completionRaw)
      : String(completionRaw ?? "").trim()
        ? excelSerialToCompletionDate(Number(completionRaw)) || null
        : null;

  const isCompleted = isCompletedFromCompletionDate(completion_date);

  const configurations =
    bhkType || location
      ? [
          {
            bhk_type: bhkType || "—",
            price_min: 0,
            price_max: 0,
            location: location || null,
            active: true,
          },
        ]
      : [];

  return {
    name,
    type: builder,
    rera_number: rera,
    description,
    area,
    completion_date,
    case_study_info: null,
    isCompleted,
    status: !isCompleted,
    files: [],
    configurations,
    locations: parseConnectivity(get("Location + mode of transport + Time")),
    amenities: parseAmenities(get("Project Amenities")),
  };
}

async function createProject(payload) {
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth": "true",
    },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    throw new Error(
      body.message ||
        body.error ||
        `HTTP ${res.status}: ${JSON.stringify(body).slice(0, 300)}`,
    );
  }
  return body;
}

async function listProjectNames() {
  const res = await fetch(`${API_BASE}/projects?per_page=100&page=1`, {
    headers: { Accept: "application/json", "x-auth": "true" },
  });
  const body = await res.json();
  return new Set(
    (body?.data?.data ?? []).map((p) => p.name.trim().toLowerCase()),
  );
}

function loadRemainingRows() {
  const wb = XLSX.readFile(EXCEL_PATH);
  const rows = XLSX.utils.sheet_to_json(wb.Sheets["Sheet1"], {
    header: 1,
    defval: "",
  });
  const header = rows[0];
  const data = rows.slice(1).filter((r) => String(r[0] ?? "").trim());
  const stopIdx = data.findIndex(
    (r) => String(r[0]).trim() === STOP_AFTER_NAME,
  );
  if (stopIdx < 0) {
    throw new Error(`Could not find "${STOP_AFTER_NAME}" in Excel`);
  }
  return { header, rows: data.slice(stopIdx + 1) };
}

async function main() {
  const { header, rows } = loadRemainingRows();
  const existingNames = await listProjectNames();

  console.log(
    `Importing ${rows.length} projects after "${STOP_AFTER_NAME}"...\n`,
  );

  const results = [];

  for (const row of rows) {
    const payload = rowToPayload(row, header);
    const normalizedName = payload.name.trim().toLowerCase();

    if (!payload.name) {
      results.push({
        name: "(empty)",
        status: "skipped",
        reason: "missing name",
      });
      continue;
    }

    if (existingNames.has(normalizedName)) {
      results.push({
        name: payload.name,
        status: "skipped",
        reason: "already exists",
      });
      console.log(`⏭  ${payload.name} — already exists`);
      continue;
    }

    try {
      const response = await createProject(payload);
      const id = response?.data?.id;
      existingNames.add(normalizedName);
      results.push({ name: payload.name, status: "created", id });
      console.log(
        `✓  ${payload.name} — created (id ${id}, locations: ${payload.locations.length}, amenities: ${payload.amenities.length})`,
      );
    } catch (error) {
      results.push({
        name: payload.name,
        status: "failed",
        reason: error instanceof Error ? error.message : String(error),
      });
      console.error(
        `✗  ${payload.name} — ${error instanceof Error ? error.message : error}`,
      );
    }
  }

  console.log("\n--- Summary ---");
  const created = results.filter((r) => r.status === "created").length;
  const skipped = results.filter((r) => r.status === "skipped").length;
  const failed = results.filter((r) => r.status === "failed").length;
  console.log(`Created: ${created}, Skipped: ${skipped}, Failed: ${failed}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
