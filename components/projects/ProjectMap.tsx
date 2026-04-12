"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

// Fix the default Leaflet marker icon paths broken by webpack/Next.js bundling
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export interface MapMarker {
  lat: number;
  lng: number;
  label: string;
  isMain?: boolean;
}

interface ProjectMapProps {
  center: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
}

// Custom branded pin for the main project location
function makeMainIcon() {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        background: linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%);
        width: 36px;
        height: 36px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
}

// Smaller grey pin for nearby places
function makeNearbyIcon() {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        background: #8F8183;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 1px 4px rgba(0,0,0,0.25);
      "></div>
    `,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    popupAnchor: [0, -8],
  });
}

export function ProjectMap({
  center,
  zoom = 14,
  markers = [],
  className = "",
}: ProjectMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add markers
    markers.forEach(({ lat, lng, label, isMain }) => {
      const icon = isMain ? makeMainIcon() : makeNearbyIcon();
      L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(
          `<span style="font-family:var(--font-nexa);font-size:13px;font-weight:600">${label}</span>`,
        );
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ zIndex: 0 }}
    />
  );
}
