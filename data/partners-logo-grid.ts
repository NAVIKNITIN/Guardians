export type PartnersGridLogo = {
  id: string;
  name: string;
  src: string;
};

const logo = (group: number) =>
  `/images/partners/logos/Group ${group}.png`;

/** 4×4 grid order (Figma partners page) — row-major, left to right. */
export const PARTNERS_GRID_LOGOS: readonly PartnersGridLogo[] = [
  { id: "adani", name: "Adani Realty", src: logo(29) },
  { id: "godrej", name: "Godrej Properties", src: logo(33) },
  { id: "marathon", name: "Marathon", src: logo(34) },
  { id: "sunteck", name: "Sunteck", src: logo(36) },
  { id: "piramal", name: "Piramal Realty", src: logo(38) },
  { id: "sheth", name: "Sheth Creators", src: logo(32) },
  { id: "guru-prerna", name: "Guru Prerna Corporation", src: logo(47) },
  { id: "integrated", name: "Integrated", src: logo(37) },
  { id: "tridhaatu", name: "Tridhaatu", src: logo(49) },
  { id: "bhimjyani", name: "Bhimjyani Realty", src: logo(43) },
  { id: "siddha", name: "Siddha", src: logo(40) },
  { id: "chandak", name: "Chandak", src: logo(44) },
  { id: "crystal", name: "Crystal", src: logo(30) },
  { id: "crescent", name: "Crescent", src: logo(42) },
  { id: "ashford", name: "Ashford", src: logo(39) },
  { id: "ashish", name: "Ashish Group", src: logo(45) },
] as const;
