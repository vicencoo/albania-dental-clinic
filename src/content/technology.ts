import type { Technology } from "./types";

export const technologies: Technology[] = [
  {
    slug: "3d-ct",
    name: { sq: "Tomografi 3D (CBCT)", it: "TAC 3D (CBCT)", en: "3D CT scan (CBCT)" },
    description: {
      sq: "Skaneri CBCT në klinikë krijon një imazh tredimensional të nofullave me një dozë të ulët rrezatimi. Shohim saktë vëllimin e kockës, nervat dhe sinuset përpara çdo implanti.",
      it: "Lo scanner CBCT in clinica crea un'immagine tridimensionale delle arcate con una bassa dose di radiazioni. Vediamo con precisione volume osseo, nervi e seni prima di ogni impianto.",
      en: "The CBCT scanner in the clinic creates a three-dimensional image of the jaws with a low radiation dose. We see bone volume, nerves and sinuses precisely before every implant.",
    },
    image: "/images/clinic/tech-cbct-unit.jpg",
  },
  {
    slug: "intraoral-scanner",
    name: { sq: "Skaner intraoral", it: "Scanner intraorale", en: "Intraoral scanner" },
    description: {
      sq: "Masat digjitale merren me një skaner të vogël optik: pa pastë, pa siklet dhe me saktësi të lartë për punimet në laborator.",
      it: "Le impronte digitali si prendono con un piccolo scanner ottico: niente pasta, nessun fastidio e alta precisione per i lavori di laboratorio.",
      en: "Digital impressions are taken with a small optical scanner: no paste, no discomfort and high accuracy for laboratory work.",
    },
  },
  {
    slug: "digital-x-ray",
    name: { sq: "Radiografi digjitale", it: "Radiografia digitale", en: "Digital X-ray" },
    description: {
      sq: "Radiografitë digjitale dhe ortopanoramika japin imazhe të qarta menjëherë, me më pak rrezatim se filmat tradicionalë.",
      it: "Radiografie digitali e panoramiche offrono immagini nitide all'istante, con meno radiazioni rispetto alle pellicole tradizionali.",
      en: "Digital X-rays and panoramic images give clear results instantly, with less radiation than traditional film.",
    },
    image: "/images/clinic/tech-3d-ct-scan.jpg",
  },
  {
    slug: "cad-cam-lab",
    name: { sq: "Laborator CAD/CAM", it: "Laboratorio CAD/CAM", en: "CAD/CAM laboratory" },
    description: {
      sq: "Kurorat, urat dhe dhëmbët e harkut të plotë dizajnohen në kompjuter dhe frezohen në zirkon në laboratorin tonë — edhe në ditën e ndërhyrjes.",
      it: "Corone, ponti e arcate complete vengono progettati al computer e fresati in zirconia nel nostro laboratorio, anche il giorno dell'intervento.",
      en: "Crowns, bridges and full-arch teeth are designed on the computer and milled in zirconia in our laboratory — even on the day of surgery.",
    },
    image: "/images/lab/zirconia-bridge.jpg",
  },
  {
    slug: "guided-surgery",
    name: { sq: "Kirurgji e udhëhequr", it: "Chirurgia guidata", en: "Guided surgery" },
    description: {
      sq: "Implantet planifikohen virtualisht mbi skanimin 3D dhe vendosen përmes një udhëzuesi kirurgjikal: më shumë saktësi, prerje më të vogla dhe shërim më i rehatshëm.",
      it: "Gli impianti vengono pianificati virtualmente sulla TAC 3D e inseriti tramite una guida chirurgica: più precisione, incisioni ridotte e guarigione più confortevole.",
      en: "Implants are planned virtually on the 3D scan and placed through a surgical guide: more precision, smaller incisions and a more comfortable recovery.",
    },
    image: "/images/treatments/implant-render.jpg",
  },
];
