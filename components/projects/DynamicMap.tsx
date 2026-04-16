import dynamic from "next/dynamic";
import type { MapMarker } from "./ProjectMap";

// Leaflet cannot run on the server — load it only in the browser
export const DynamicMap = dynamic(
  () => import("./ProjectMap").then((m) => m.ProjectMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full animate-pulse items-center justify-center bg-[#BCBDC0]">
        <span className="n-reg  text-sm text-[#202225]/60">
          Loading map…
        </span>
      </div>
    ),
  },
);

export type { MapMarker };
