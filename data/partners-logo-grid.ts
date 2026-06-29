export type PartnersGridLogo = {
  id: string;
  name: string;
  src: string;
};

/** Colour partner logos — `Asset N.svg` matches legacy `Group N.png` numbering (+204). */
const colourLogo = (group: number) =>
  `/images/Colour%20logos/Asset%20${group + 204}.svg`;

const COLOUR_LOGO_FIRST_ASSET = 233;
const COLOUR_LOGO_LAST_ASSET = 287;

/** Display names for partners we can identify (remaining use generic alt text). */
const KNOWN_PARTNER_NAMES: Record<number, string> = {
  29: "Adani Realty",
  30: "Crystal",
  32: "Sheth Creators",
  33: "Godrej Properties",
  34: "Marathon",
  36: "Sunteck",
  37: "Integrated",
  38: "Piramal Realty",
  39: "Ashford",
  40: "Siddha",
  42: "Crescent",
  43: "Bhimjyani Realty",
  44: "Chandak",
  45: "Ashish Group",
  47: "Guru Prerna Corporation",
  49: "Tridhaatu",
};

function buildPartnersGridLogos(): PartnersGridLogo[] {
  return Array.from(
    { length: COLOUR_LOGO_LAST_ASSET - COLOUR_LOGO_FIRST_ASSET + 1 },
    (_, index) => {
      const asset = COLOUR_LOGO_FIRST_ASSET + index;
      const group = asset - 204;
      return {
        id: `group-${group}`,
        name: KNOWN_PARTNER_NAMES[group] ?? `Partner brand ${group}`,
        src: colourLogo(group),
      };
    },
  );
}

/** All colour logos in `public/images/Colour logos/` (Asset 233–287). */
export const PARTNERS_GRID_LOGOS: readonly PartnersGridLogo[] =
  buildPartnersGridLogos();
