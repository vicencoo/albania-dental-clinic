import type { ResultCase } from "./types";

// Only cases with consentConfirmed === true are shown.
const allCases: ResultCase[] = [
  {
    slug: "case-1",
    treatment: "replacing-old-bridges",
    category: "implantology",
    title: {
      sq: "Urë e re mbi implante në nofullën e sipërme",
      it: "Nuovo ponte su impianti nell'arcata superiore",
      en: "New implant-supported bridge, upper arch",
    },
    description: {
      sq: "Restaurimi i vjetër u zëvendësua me një urë të re të punuar në laboratorin tonë, me formë dhe ngjyrë natyrale.",
      it: "Il vecchio restauro è stato sostituito con un nuovo ponte realizzato nel nostro laboratorio, con forma e colore naturali.",
      en: "The old restoration was replaced with a new bridge made in our laboratory, with natural shape and shade.",
    },
    beforeImage: "/images/results/case-1-before.jpg",
    afterImage: "/images/results/case-1-after.jpg",
    // Published by the clinic on its public Instagram (intra-oral photo, no face).
    // TODO: confirm signed written consent is on file.
    consentConfirmed: true,
  },
];

export const results = allCases.filter((c) => c.consentConfirmed);
