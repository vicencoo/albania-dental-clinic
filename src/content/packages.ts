import type { Package } from "./types";

// TODO: clinic to confirm package contents. Never invent prices: keep "[PRICE]".
export const packages: Package[] = [
  {
    slug: "same-day-teeth-package",
    name: {
      sq: "Dhëmbë në një ditë + qëndrim",
      it: "Denti in un giorno + soggiorno",
      en: "Same-day teeth + stay",
    },
    description: {
      sq: "Për pacientët që vijnë nga larg: i gjithë trajtimi i dhëmbëve në një ditë dhe qëndrimi, të organizuara në një plan të vetëm.",
      it: "Per chi arriva da lontano: tutto il trattamento dei denti in un giorno e il soggiorno, organizzati in un unico piano.",
      en: "For patients travelling from afar: the complete same-day teeth treatment and your stay, organised in a single plan.",
    },
    includes: [
      { sq: "Konsultë dhe tomografi 3D CBCT", it: "Visita e TAC 3D CBCT", en: "Consultation and 3D CBCT scan" },
      { sq: "Planifikim digjital i ndërhyrjes", it: "Pianificazione digitale dell'intervento", en: "Digital surgical planning" },
      { sq: "Implante dhe dhëmbë fiks të përkohshëm", it: "Impianti e denti fissi provvisori", en: "Implants and fixed provisional teeth" },
      { sq: "Qëndrim në apartamentin e klinikës (sipas disponueshmërisë)", it: "Soggiorno nell'appartamento della clinica (secondo disponibilità)", en: "Stay in the clinic's apartment (subject to availability)" },
      { sq: "Kontrolle pas ndërhyrjes", it: "Controlli post-intervento", en: "Post-operative check-ups" },
    ],
    treatments: ["all-on-4", "all-on-6"],
    price: "[PRICE]",
  },
];
