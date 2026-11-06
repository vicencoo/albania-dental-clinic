import { todo } from "./placeholder";
import type { TeamMember } from "./types";

export const team: TeamMember[] = [
  {
    slug: "dr-donela-dede",
    name: "Dr. Donela Dede",
    isLead: true,
    role: {
      sq: "Drejtuese e klinikës",
      it: "Direttrice della clinica",
      en: "Clinic director",
    },
    specialties: [
      { sq: "Kirurgji orale", it: "Chirurgia orale", en: "Oral surgery" },
      { sq: "Implantologji", it: "Implantologia", en: "Implantology" },
      { sq: "Endodonti", it: "Endodonzia", en: "Endodontics" },
      { sq: "Stomatologji estetike", it: "Odontoiatria estetica", en: "Aesthetic dentistry" },
    ],
    // TODO: clinic to confirm/extend with education, years of practice and memberships.
    bio: {
      sq: "Dr. Donela Dede drejton Albania Dental Clinic. Ajo ndjek personalisht çdo pacient, nga konsulta e parë dhe skanimi 3D deri te vendosja e dhëmbëve përfundimtarë.\n\nPuna e saj përqendrohet në kirurgjinë orale dhe implantologjinë — përfshirë trajtimet me dhëmbë fiks në një ditë — si dhe në endodonti dhe estetikë dentare. Falë diagnozës 3D në klinikë dhe laboratorit digjital ngjitur, ajo mund të planifikojë dhe të përfundojë trajtime komplekse me më pak seanca dhe më shumë saktësi.\n\nPër Dr. Dede, një trajtim i suksesshëm fillon me dëgjimin: çdo plan shpjegohet qartë, hap pas hapi, që pacienti të ndihet i sigurt përpara se të fillojë.",
      it: "La Dr.ssa Donela Dede guida Albania Dental Clinic. Segue personalmente ogni paziente, dalla prima visita e TAC 3D fino all'applicazione dei denti definitivi.\n\nIl suo lavoro si concentra sulla chirurgia orale e l'implantologia — compresi i trattamenti di denti fissi in un giorno — oltre che su endodonzia ed estetica dentale. Grazie alla diagnosi 3D in clinica e al laboratorio digitale accanto, può pianificare e completare trattamenti complessi con meno sedute e maggiore precisione.\n\nPer la Dr.ssa Dede, un trattamento riuscito inizia dall'ascolto: ogni piano viene spiegato con chiarezza, passo dopo passo, perché il paziente si senta sicuro prima di iniziare.",
      en: "Dr. Donela Dede leads Albania Dental Clinic. She personally follows every patient, from the first consultation and 3D scan to the fitting of the final teeth.\n\nHer work focuses on oral surgery and implantology — including same-day fixed teeth — as well as endodontics and aesthetic dentistry. With 3D diagnosis on site and the digital laboratory next door, she can plan and complete complex treatments in fewer sessions and with greater precision.\n\nFor Dr. Dede, a successful treatment starts with listening: every plan is explained clearly, step by step, so that patients feel confident before they begin.",
    },
    photo: "/images/team/dr-donela-dede.jpg",
  },
  // TODO: replace with real team members supplied by the clinic.
  // At least one non-lead entry must exist: with cacheComponents, /clinic/team/[slug]
  // fails to build if generateStaticParams returns an empty list.
  // Entries whose name is still a placeholder are hidden from listings and the sitemap.
  {
    slug: "team-member-1",
    name: "[NAME]",
    role: todo("ROLE"),
    specialties: [todo("SPECIALTY")],
    bio: todo("BIO"),
  },
];

export function getTeamMember(slug: string) {
  return team.find((m) => m.slug === slug);
}

export const leadDoctor = team.find((m) => m.isLead)!;

/** Members with confirmed details (placeholders hidden). */
export const publishedTeam = team.filter((m) => !/^\[.*\]$/.test(m.name));
