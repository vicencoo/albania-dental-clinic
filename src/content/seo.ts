import type { AppLocale } from "@/i18n/routing";
import type { AppPath } from "./types";

/**
 * Search-engine titles, descriptions and keywords, per language.
 *
 * - `title` is what Google shows as the blue link. It is used as-is (no brand suffix), so keep it
 *   under ~60 characters and put the main keyword first.
 * - `description` is the grey text under the link: aim for 140–160 characters, with the
 *   keyword and a reason to click.
 * - `keywords` go into <meta name="keywords"> (used by Bing/Yandex and some tools; Google
 *   ignores this tag and ranks on title, description, headings and page text instead).
 *
 * Pages without an entry here fall back to messages "pages.<key>" (title/description).
 * Never put claims here that the clinic cannot back up (prices, "best", guarantees).
 */
export interface Seo {
  title: string;
  description: string;
  keywords: string[];
}

type LocalizedSeo = Record<AppLocale, Seo>;

/* --------------------------------------------------------------- Static pages */

export const pageSeo: Partial<Record<AppPath, LocalizedSeo>> = {
  "/": {
    sq: {
      title: "Albania Dental Clinic Vlorë – Implante dhe dhëmbë në një ditë",
      description:
        "Albania Dental Clinic në Vlorë: implante dentare, dhëmbë fiks në një ditë (All-on-4, All-on-6), skaner 3D dhe laborator dixhital në klinikë. Drejtuar nga Dr. Donela Dede.",
      keywords: ["dentist Vlorë", "klinikë dentare Vlorë", "klinika dentare Vlorë", "klinika dentare vlore", "implante dentare Vlorë", 
        "klinikë dentare Shqipëri",
        "dentist Shqipëri",
        "implante dentare",
        "dhëmbë në një ditë",
        "dhëmbë fiks në një ditë",
        "All-on-4 Shqipëri",
        "All-on-6",
        "implantologji",
        "kurora zirkoni",
        "fasete dentare",
        "laborator dentar dixhital",
        "Dr. Donela Dede",
      ],
    },
    it: {
      title: "Albania Dental Clinic Valona – Impianti e denti in un giorno",
      description:
        "Dentista a Valona (Vlorë), Albania: impianti a costi accessibili, denti fissi in un giorno (All-on-4, All-on-6), TAC 3D e laboratorio interno. Si parla italiano.",
      keywords: ["dentista Valona", "dentista Vlora", "clinica dentale Valona", "impianti dentali Valona", 
        "dentista in Albania",
        "clinica dentale Albania",
        "impianti dentali Albania",
        "denti in un giorno",
        "denti fissi in un giorno",
        "carico immediato",
        "All-on-4 Albania",
        "All-on-6 Albania",
        "turismo dentale Albania",
        "dentista Albania prezzi",
        "cliniche dentali Albania",
        "rifare i denti in Albania",
        "sbiancamento dentale Albania",
        "corone in zirconio",
        "faccette dentali Albania",
        "dentista italiano Albania",
      ],
    },
    en: {
      title: "Albania Dental Clinic Vlorë – Implants & Same-Day Teeth",
      description:
        "Dental clinic in Vlorë, Albania: affordable implants, same-day fixed teeth (All-on-4, All-on-6), 3D CBCT and an in-house lab. English-speaking care.",
      keywords: ["dentist Vlore", "dentist Vlora", "dental clinic Vlore", "dental implants Vlora", 
        "dentist in Albania",
        "dental clinic Albania",
        "dental implants Albania",
        "same day teeth",
        "teeth in a day",
        "All-on-4 Albania",
        "All-on-6 Albania",
        "dental tourism Albania",
        "cheap dental implants abroad",
        "Albania dentist prices",
        "zirconia crowns Albania",
        "veneers Albania",
      ],
    },
  },

  "/same-day-teeth": {
    sq: {
      title: "Dhëmbë fiks në një ditë – implante me ngarkim të shpejtë",
      description:
        "Një hark i plotë dhëmbësh fiks mbi implante në një ditë të vetme: diagnozë 3D, kirurgji e drejtuar dhe laborator në klinikë. Zbuloni nëse jeni kandidat.",
      keywords: ["dhëmbë në një ditë Vlorë", 
        "dhëmbë në një ditë",
        "dhëmbë fiks në një ditë",
        "ngarkim i menjëhershëm",
        "implante në një ditë",
        "All-on-4",
        "All-on-6",
        "protezë fikse mbi implante",
        "hark i plotë implante",
      ],
    },
    it: {
      title: "Denti fissi in un giorno in Albania – carico immediato",
      description:
        "Rifare i denti in Albania in un giorno: arcata completa di denti fissi su impianti, TAC 3D, chirurgia guidata e laboratorio interno. Scopri se sei candidato.",
      keywords: ["denti fissi in un giorno Valona", 
        "denti fissi in un giorno",
        "denti in un giorno Albania",
        "impianti a carico immediato",
        "protesi fissa su impianti",
        "arcata completa su impianti",
        "All-on-4",
        "All-on-6",
        "denti fissi in 24 ore",
        "rifare i denti in Albania",
      ],
    },
    en: {
      title: "Same-Day Teeth in Albania – Fixed Teeth in One Day",
      description:
        "A full arch of fixed teeth on implants in a single day: 3D diagnosis, guided surgery and our own lab. Find out if you are a candidate for teeth in a day.",
      keywords: ["same day teeth Vlore", 
        "same day teeth",
        "teeth in a day",
        "same day dental implants",
        "immediate load implants",
        "fixed teeth in one day",
        "full arch implants",
        "All-on-4 same day",
        "permanent dentures alternative",
      ],
    },
  },

  "/same-day-teeth/how-it-works": {
    sq: {
      title: "Dhëmbë në një ditë: si funksionon, hap pas hapi",
      description:
        "Nga radiografia te dhëmbët fiks: gjashtë hapat e trajtimit me dhëmbë në një ditë në Albania Dental Clinic, me skaner 3D dhe kirurgji të drejtuar.",
      keywords: [
        "dhëmbë në një ditë si funksionon",
        "procedura All-on-4",
        "hapat e implanteve",
        "kirurgji e drejtuar implante",
        "skaner 3D CBCT",
      ],
    },
    it: {
      title: "Denti in un giorno: come funziona, passo dopo passo",
      description:
        "Dalla radiografia ai denti fissi: le sei fasi del trattamento denti in un giorno ad Albania Dental Clinic, con TAC 3D e chirurgia guidata.",
      keywords: [
        "denti in un giorno come funziona",
        "procedura All-on-4",
        "fasi impianto dentale",
        "chirurgia implantare guidata",
        "TAC 3D dentale",
      ],
    },
    en: {
      title: "Same-Day Teeth: How It Works, Step by Step",
      description:
        "From X-ray to fixed teeth: the six steps of same-day teeth treatment at Albania Dental Clinic, with 3D CBCT planning and guided implant surgery.",
      keywords: [
        "teeth in a day process",
        "All-on-4 procedure steps",
        "same day implants how it works",
        "guided implant surgery",
        "3D CBCT scan",
      ],
    },
  },

  "/same-day-teeth/candidates": {
    sq: {
      title: "A jam kandidat për dhëmbë në një ditë?",
      description:
        "Kush mund të marrë dhëmbë fiks mbi implante në një ditë? Bëni vetëkontrollin e shpejtë dhe dërgoni radiografinë për një vlerësim të parë.",
      keywords: [
        "kandidat për implante",
        "a mund të bëj implante",
        "implante pa kockë",
        "dhëmbë në një ditë kush",
        "zëvendësim protezash",
      ],
    },
    it: {
      title: "Sono candidato ai denti fissi in un giorno?",
      description:
        "Chi può avere denti fissi su impianti in un giorno? Fai il test rapido e inviaci la panoramica per una prima valutazione del tuo caso.",
      keywords: [
        "candidato impianti dentali",
        "posso fare gli impianti",
        "impianti con poco osso",
        "denti in un giorno chi può",
        "sostituire la dentiera",
      ],
    },
    en: {
      title: "Am I a Candidate for Same-Day Teeth?",
      description:
        "Who can get fixed teeth on implants in one day? Take the quick self-check and send your X-ray for a first assessment of your case.",
      keywords: [
        "candidate for dental implants",
        "am I a candidate for All-on-4",
        "implants with bone loss",
        "replace dentures with implants",
        "teeth in a day eligibility",
      ],
    },
  },

  "/treatments": {
    sq: {
      title: "Trajtime dentare: implante, estetikë dhe stomatologji",
      description:
        "Të gjitha trajtimet e Albania Dental Clinic: implante, All-on-4, kurora zirkoni, fasete, zbardhim, endodonti, kirurgji orale dhe stomatologji për fëmijë.",
      keywords: ["stomatolog Vlorë", 
        "trajtime dentare",
        "implante dentare",
        "stomatologji estetike",
        "kurora zirkoni",
        "fasete",
        "zbardhim dhëmbësh",
        "mjekim kanali",
        "stomatolog për fëmijë",
      ],
    },
    it: {
      title: "Cure dentali in Albania: impianti, estetica e conservativa",
      description:
        "Tutte le cure di Albania Dental Clinic: impianti, All-on-4, corone in zirconio, faccette, sbiancamento, endodonzia, chirurgia orale e pedodonzia.",
      keywords: ["dentista Valona prezzi", 
        "cure dentali Albania",
        "impianti dentali",
        "odontoiatria estetica",
        "corone in zirconio",
        "faccette dentali",
        "sbiancamento denti",
        "devitalizzazione",
        "dentista bambini",
      ],
    },
    en: {
      title: "Dental Treatments in Albania: Implants & Cosmetic",
      description:
        "All treatments at Albania Dental Clinic: implants, All-on-4, zirconia crowns, veneers, whitening, root canal treatment, oral surgery and children's dentistry.",
      keywords: ["dentist in Vlore", 
        "dental treatments Albania",
        "dental implants",
        "cosmetic dentistry Albania",
        "zirconia crowns",
        "porcelain veneers",
        "teeth whitening",
        "root canal treatment",
        "children's dentist",
      ],
    },
  },

  "/clinic": {
    sq: {
      title: "Klinika – stafi, teknologjia 3D dhe laboratori dentar",
      description:
        "Njihuni me Albania Dental Clinic: Dr. Donela Dede, ekipi, skaneri 3D CBCT dhe laboratori dixhital CAD/CAM – gjithçka nën të njëjtin çati.",
      keywords: ["klinikë dentare moderne", "stomatologji dixhitale", "laborator dentar", "CBCT", "Dr. Donela Dede"],
    },
    it: {
      title: "La clinica – team, tecnologia 3D e laboratorio interno",
      description:
        "Scopri Albania Dental Clinic: la Dr.ssa Donela Dede, il team, la TAC 3D CBCT e il laboratorio digitale CAD/CAM, tutto sotto lo stesso tetto.",
      keywords: ["clinica dentale moderna Albania", "odontoiatria digitale", "laboratorio odontotecnico", "TAC 3D", "Donela Dede"],
    },
    en: {
      title: "Our Clinic – Team, 3D Technology & In-House Lab",
      description:
        "Meet Albania Dental Clinic: Dr. Donela Dede, our team, 3D CBCT imaging and an in-house CAD/CAM digital laboratory, all under one roof.",
      keywords: ["modern dental clinic Albania", "digital dentistry", "in-house dental lab", "CBCT scan", "Dr. Donela Dede"],
    },
  },

  "/clinic/dr-donela-dede": {
    sq: {
      title: "Dr. Donela Dede – implantologe dhe kirurge orale",
      description:
        "Dr. Donela Dede drejton Albania Dental Clinic: kirurgji orale, implantologji, dhëmbë në një ditë, endodonti dhe stomatologji estetike.",
      keywords: ["Dr. Donela Dede", "implantolog Shqipëri", "kirurg oral", "dentist me përvojë", "stomatologe"],
    },
    it: {
      title: "Dr.ssa Donela Dede – implantologa e chirurga orale",
      description:
        "La Dr.ssa Donela Dede dirige Albania Dental Clinic: chirurgia orale, implantologia, denti in un giorno, endodonzia ed estetica dentale.",
      keywords: ["Donela Dede", "implantologo Albania", "chirurgo orale Albania", "dentista donna Albania", "odontoiatra"],
    },
    en: {
      title: "Dr. Donela Dede – Implant Dentist & Oral Surgeon",
      description:
        "Dr. Donela Dede leads Albania Dental Clinic: oral surgery, implantology, same-day teeth, endodontics and cosmetic dentistry.",
      keywords: ["Dr. Donela Dede", "implant dentist Albania", "oral surgeon Albania", "experienced dentist", "lead dentist"],
    },
  },

  "/clinic/team": {
    sq: {
      title: "Ekipi ynë – dentistë, asistentë dhe teknikë dentarë",
      description:
        "Njihuni me dentistët, asistentët dhe teknikët dentarë të Albania Dental Clinic që kujdesen për ju nga konsulta deri te dhëmbët përfundimtarë.",
      keywords: ["dentistë Shqipëri", "ekipi dentar", "teknikë dentarë", "asistentë dentarë"],
    },
    it: {
      title: "Il nostro team – dentisti, assistenti e odontotecnici",
      description:
        "Conosci i dentisti, gli assistenti e gli odontotecnici di Albania Dental Clinic che ti seguono dalla visita fino ai denti definitivi.",
      keywords: ["dentisti in Albania", "team odontoiatrico", "odontotecnici", "assistenti alla poltrona"],
    },
    en: {
      title: "Our Team – Dentists, Assistants & Technicians",
      description:
        "Meet the dentists, assistants and dental technicians of Albania Dental Clinic who look after you from consultation to your final teeth.",
      keywords: ["dentists in Albania", "dental team", "dental technicians", "dental nurses"],
    },
  },

  "/clinic/technology": {
    sq: {
      title: "Teknologji dentare – CBCT 3D, skaner intraoral, CAD/CAM",
      description:
        "Skaner 3D CBCT, skaner intraoral, radiografi dixhitale, laborator CAD/CAM dhe kirurgji e drejtuar implantesh për trajtime më të sakta dhe më të shpejta.",
      keywords: ["CBCT 3D", "skaner intraoral", "radiografi dixhitale", "CAD/CAM", "kirurgji e drejtuar", "stomatologji dixhitale"],
    },
    it: {
      title: "Tecnologia dentale – TAC 3D, scanner intraorale, CAD/CAM",
      description:
        "TAC 3D CBCT, scanner intraorale, radiografia digitale, laboratorio CAD/CAM e chirurgia implantare guidata per cure più precise e più rapide.",
      keywords: ["TAC 3D CBCT", "scanner intraorale", "radiografia digitale", "CAD/CAM dentale", "chirurgia guidata", "odontoiatria digitale"],
    },
    en: {
      title: "Dental Technology – 3D CBCT, Intraoral Scanner, CAD/CAM",
      description:
        "3D CBCT imaging, intraoral scanning, digital X-ray, a CAD/CAM lab and guided implant surgery for more precise, faster dental treatment.",
      keywords: ["3D CBCT scan", "intraoral scanner", "digital X-ray", "CAD/CAM dentistry", "guided implant surgery", "digital dentistry"],
    },
  },

  "/clinic/laboratory": {
    sq: {
      title: "Laborator dentar dixhital në klinikë – CAD/CAM",
      description:
        "Laboratori ynë CAD/CAM projekton dhe frezon dhëmbë zirkoni brenda klinikës – edhe në ditën e ndërhyrjes. Më pak pritje, më shumë saktësi.",
      keywords: ["laborator dentar", "laborator CAD/CAM", "kurora zirkoni", "teknik dentar", "frezim zirkoni"],
    },
    it: {
      title: "Laboratorio odontotecnico digitale interno – CAD/CAM",
      description:
        "Il nostro laboratorio CAD/CAM progetta e fresa denti in zirconio dentro la clinica, anche il giorno dell'intervento. Meno attese, più precisione.",
      keywords: ["laboratorio odontotecnico", "laboratorio CAD/CAM", "corone in zirconio", "odontotecnico", "fresatura zirconio"],
    },
    en: {
      title: "In-House Digital Dental Lab – CAD/CAM Zirconia",
      description:
        "Our CAD/CAM laboratory designs and mills zirconia teeth inside the clinic, even on the day of surgery. Less waiting, more precision.",
      keywords: ["in-house dental lab", "CAD/CAM dental laboratory", "zirconia crowns", "dental technician", "zirconia milling"],
    },
  },

  "/clinic/environment": {
    sq: {
      title: "Ambienti i klinikës – modern, i ndritshëm dhe i qetë",
      description:
        "Shikoni ambientet e Albania Dental Clinic: recepsioni, salla e pritjes dhe dhomat e trajtimit, ku të rriturit dhe fëmijët ndihen rehat.",
      keywords: ["klinikë dentare moderne", "ambient i qetë", "foto klinike dentare"],
    },
    it: {
      title: "Gli ambienti della clinica – moderni e luminosi",
      description:
        "Guarda gli ambienti di Albania Dental Clinic: reception, sala d'attesa e sale di cura, dove adulti e bambini si sentono a proprio agio.",
      keywords: ["clinica dentale moderna", "studio dentistico Albania foto", "ambiente accogliente"],
    },
    en: {
      title: "Our Clinic Environment – Modern, Bright & Calm",
      description:
        "See inside Albania Dental Clinic: reception, waiting room and treatment rooms where adults and children feel at ease.",
      keywords: ["modern dental clinic", "dental clinic photos Albania", "comfortable dental clinic"],
    },
  },

  "/clinic/why-choose-us": {
    sq: {
      title: "Pse të na zgjidhni – dhëmbë në një ditë në Shqipëri",
      description:
        "Pse Albania Dental Clinic është një nga klinikat e pakta në Shqipëri me dhëmbë në një ditë të plotë: diagnozë 3D, kirurgji e drejtuar dhe laborator në klinikë.",
      keywords: ["pse të zgjedh klinikën", "dentist i besuar Shqipëri", "dhëmbë në një ditë Shqipëri"],
    },
    it: {
      title: "Perché sceglierci – denti in un giorno in Albania",
      description:
        "Perché Albania Dental Clinic è una delle poche cliniche in Albania con denti in un giorno completi: diagnosi 3D, chirurgia guidata e laboratorio interno.",
      keywords: ["miglior dentista Albania", "dentista affidabile Albania", "perché curarsi in Albania"],
    },
    en: {
      title: "Why Choose Us – Same-Day Teeth in Albania",
      description:
        "Why Albania Dental Clinic is one of the few clinics in Albania offering complete same-day teeth: 3D diagnosis, guided surgery and an in-house lab.",
      keywords: ["best dentist Albania", "trusted dental clinic Albania", "why get dental work in Albania"],
    },
  },

  "/dental-tourism": {
    sq: {
      title: "Turizëm dentar në Shqipëri – trajtim dhe qëndrim",
      description:
        "Trajtim dentar në Shqipëri me plan personal, transfertë nga aeroporti dhe apartamentet e klinikës për pacientët. Implante dhe dhëmbë në një ditë.",
      keywords: ["turizëm dentar Vlorë", "turizëm dentar Shqipëri", "pacientë nga jashtë", "implante për diasporën", "dentist për emigrantët"],
    },
    it: {
      title: "Turismo dentale in Albania – cure, viaggio e alloggio",
      description:
        "Cure dentali a Valona, sul mare in Albania: piano personale, transfer dall'aeroporto e appartamenti della clinica. Impianti e denti in un giorno, in italiano.",
      keywords: ["turismo dentale Valona", "dentista Valona", 
        "turismo dentale Albania",
        "cliniche dentali Albania",
        "rifare i denti in Albania",
        "dentista all'estero",
        "impianti dentali all'estero",
        "curarsi i denti in Albania",
        "dentista Albania opinioni",
        "viaggio dentale Albania",
      ],
    },
    en: {
      title: "Dental Tourism in Albania – Treatment, Travel & Stay",
      description:
        "Dental treatment in Vlorë, on the Albanian coast: a personal plan, airport transfers and the clinic's own apartments. Implants and same-day teeth abroad.",
      keywords: ["dental tourism Vlore", "dentist Vlora Albania", 
        "dental tourism Albania",
        "dentist abroad",
        "dental implants abroad",
        "dental holiday Albania",
        "Albania vs Turkey dental",
        "cheap dentist Europe",
      ],
    },
  },

  "/dental-tourism/how-it-works": {
    sq: {
      title: "Turizëm dentar: si funksionon, në pesë hapa",
      description:
        "Pesë hapa nga dërgimi i radiografisë deri te kthimi në shtëpi me buzëqeshje të re: plan trajtimi, data, transferta, qëndrim dhe kontroll.",
      keywords: ["si funksionon turizmi dentar", "plan trajtimi dentar", "transfertë aeroporti"],
    },
    it: {
      title: "Turismo dentale in Albania: come funziona in 5 passi",
      description:
        "Cinque passi dall'invio della panoramica al rientro a casa con un sorriso nuovo: piano di cura, date, transfer, alloggio e controlli.",
      keywords: ["turismo dentale come funziona", "piano di cura dentale", "transfer aeroporto Tirana", "preventivo dentista Albania"],
    },
    en: {
      title: "Dental Tourism in Albania: How It Works in 5 Steps",
      description:
        "Five steps from sending your X-ray to flying home with a new smile: treatment plan, dates, airport transfer, accommodation and follow-up.",
      keywords: ["how dental tourism works", "dental treatment plan abroad", "Tirana airport transfer", "dental quote Albania"],
    },
  },

  "/dental-tourism/apartments": {
    sq: {
      title: "Apartamentet e klinikës për pacientët",
      description:
        "Albania Dental Clinic ka apartamentet e veta për pacientët që vijnë nga larg: vende të qeta për të pushuar mes takimeve dhe pas ndërhyrjes.",
      keywords: ["akomodim për pacientë", "apartament pranë klinikës", "qëndrim gjatë trajtimit dentar"],
    },
    it: {
      title: "Appartamenti della clinica per i pazienti",
      description:
        "Albania Dental Clinic ha appartamenti propri per i pazienti che arrivano da lontano: luoghi tranquilli dove riposare tra un appuntamento e l'altro.",
      keywords: ["alloggio turismo dentale", "appartamento vicino alla clinica", "dove dormire cure dentali Albania"],
    },
    en: {
      title: "Patient Apartments – Stay During Your Treatment",
      description:
        "Albania Dental Clinic has its own apartments for patients travelling from abroad: quiet places to rest between appointments and after surgery.",
      keywords: ["dental tourism accommodation", "apartment near dental clinic", "where to stay dental treatment Albania"],
    },
  },

  "/dental-tourism/packages": {
    sq: {
      title: "Paketa trajtimi dentar me qëndrim",
      description:
        "Trajtimi dhe qëndrimi në një plan të vetëm personal: implante, dhëmbë në një ditë ose estetikë, me transfertë dhe apartament të klinikës.",
      keywords: ["paketa dentare", "paketë implantesh", "trajtim me akomodim"],
    },
    it: {
      title: "Pacchetti turismo dentale – cure e soggiorno",
      description:
        "Cure e soggiorno in un unico piano personale: impianti, denti in un giorno o estetica, con transfer e appartamento della clinica.",
      keywords: ["pacchetti turismo dentale", "pacchetto impianti Albania", "cure dentali con alloggio", "all inclusive dentista Albania"],
    },
    en: {
      title: "Dental Tourism Packages – Treatment & Stay",
      description:
        "Treatment and stay in one personal plan: implants, same-day teeth or cosmetic work, with airport transfer and a clinic apartment.",
      keywords: ["dental tourism packages", "dental implant package Albania", "dental holiday package", "all inclusive dental Albania"],
    },
  },

  "/dental-tourism/travel": {
    sq: {
      title: "Udhëtimi për trajtim dentar – fluturime dhe transferta",
      description:
        "Transferta nga aeroporti, fluturime, dokumente, monedha dhe këshilla praktike për pacientët që udhëtojnë në Shqipëri për trajtim dentar.",
      keywords: ["aeroporti i Tiranës", "transfertë aeroporti", "udhëtim në Shqipëri"],
    },
    it: {
      title: "Viaggio per cure dentali in Albania – voli e transfer",
      description:
        "Transfer dall'aeroporto, voli dall'Italia, documenti, valuta e consigli pratici per i pazienti che vengono in Albania per le cure dentali.",
      keywords: ["voli per Tirana", "transfer aeroporto Tirana", "documenti per l'Albania", "viaggio in Albania"],
    },
    en: {
      title: "Travelling to Albania for Dental Treatment",
      description:
        "Airport transfers, flights, documents, currency and practical tips for patients travelling to Albania for dental treatment.",
      keywords: ["flights to Tirana", "Tirana airport transfer", "travel to Albania", "Albania entry requirements"],
    },
  },

  "/dental-tourism/discover-albania": {
    sq: {
      title: "Zbuloni Shqipërinë – Riviera, Tirana, Vlora dhe Berati",
      description:
        "Riviera shqiptare, Tirana, Vlora dhe Berati: kthejeni trajtimin dentar në një pushim të shkurtër. Këshillat tona për çfarë të shihni.",
      keywords: ["Riviera shqiptare", "Tirana", "Vlora", "Berati", "pushime në Shqipëri"],
    },
    it: {
      title: "Scopri l'Albania – Riviera, Tirana, Valona e Berat",
      description:
        "Riviera albanese, Tirana, Valona e Berat: trasforma le cure dentali in una breve vacanza. I nostri consigli su cosa vedere.",
      keywords: ["Riviera albanese", "Tirana", "Valona", "Berat", "vacanze in Albania", "cosa vedere in Albania"],
    },
    en: {
      title: "Discover Albania – Riviera, Tirana, Vlora & Berat",
      description:
        "The Albanian Riviera, Tirana, Vlora and Berat: turn your dental treatment into a short holiday. Our tips on what to see.",
      keywords: ["Albanian Riviera", "Tirana", "Vlora", "Berat", "holiday in Albania", "things to do in Albania"],
    },
  },

  "/dental-tourism/faq": {
    sq: {
      title: "Pyetje të shpeshta – implante, udhëtim dhe çmime",
      description:
        "Përgjigje për dhëmbët në një ditë, implantet, udhëtimin për trajtim, qëndrimin dhe çmimet në Albania Dental Clinic.",
      keywords: ["pyetje implante", "sa zgjat implanti", "a dhemb implanti", "çmime implantesh"],
    },
    it: {
      title: "Domande frequenti – impianti, viaggio e prezzi",
      description:
        "Risposte su denti in un giorno, impianti, viaggio per le cure, alloggio e prezzi ad Albania Dental Clinic.",
      keywords: ["domande impianti dentali", "quanto dura un impianto", "fa male l'impianto", "dentista Albania è sicuro"],
    },
    en: {
      title: "FAQ – Implants, Travel & Prices in Albania",
      description:
        "Answers about same-day teeth, dental implants, travelling for treatment, accommodation and prices at Albania Dental Clinic.",
      keywords: ["dental implant questions", "how long do implants last", "do implants hurt", "is dental work in Albania safe"],
    },
  },

  "/results": {
    sq: {
      title: "Rezultate – para dhe pas, historitë e pacientëve",
      description:
        "Raste para dhe pas me implante dhe stomatologji estetike, si dhe historitë e pacientëve të Albania Dental Clinic, të ndara me pëlqim me shkrim.",
      keywords: ["para dhe pas implante", "rezultate dentare", "historitë e pacientëve"],
    },
    it: {
      title: "Risultati – prima e dopo e storie dei pazienti",
      description:
        "Casi prima e dopo con impianti ed estetica dentale e le storie dei pazienti di Albania Dental Clinic, condivisi con consenso scritto.",
      keywords: ["prima e dopo impianti", "risultati dentista Albania", "recensioni dentista Albania"],
    },
    en: {
      title: "Results – Before & After and Patient Stories",
      description:
        "Before and after implant and cosmetic cases plus patient stories from Albania Dental Clinic, shared with written consent.",
      keywords: ["before and after dental implants", "dental results Albania", "Albania dentist reviews"],
    },
  },

  "/results/before-after": {
    sq: {
      title: "Foto para dhe pas – implante dhe fasete",
      description:
        "Krahasoni rezultatet para dhe pas trajtimeve me implante, dhëmbë në një ditë dhe stomatologji estetike në Albania Dental Clinic.",
      keywords: ["para dhe pas", "foto implante", "fasete para dhe pas", "dhëmbë në një ditë rezultate"],
    },
    it: {
      title: "Foto prima e dopo – impianti e faccette",
      description:
        "Confronta i risultati prima e dopo dei trattamenti con impianti, denti in un giorno ed estetica dentale ad Albania Dental Clinic.",
      keywords: ["prima e dopo", "foto impianti dentali", "faccette prima e dopo", "All-on-4 prima e dopo"],
    },
    en: {
      title: "Before & After Photos – Implants and Veneers",
      description:
        "Compare before and after results of implant, same-day teeth and cosmetic dentistry treatments at Albania Dental Clinic.",
      keywords: ["before and after", "dental implant photos", "veneers before and after", "All-on-4 before and after"],
    },
  },

  "/results/patient-stories": {
    sq: {
      title: "Historitë e pacientëve – përvoja reale",
      description:
        "Përvojat e pacientëve të trajtuar në Albania Dental Clinic: nga konsulta e parë te buzëqeshja e re.",
      keywords: ["përvoja pacientësh", "vlerësime dentisti", "dëshmi pacientësh"],
    },
    it: {
      title: "Storie dei pazienti – esperienze reali",
      description:
        "Le esperienze dei pazienti curati ad Albania Dental Clinic: dalla prima visita al nuovo sorriso.",
      keywords: ["opinioni dentista Albania", "recensioni turismo dentale", "testimonianze pazienti"],
    },
    en: {
      title: "Patient Stories – Real Experiences",
      description:
        "Experiences of patients treated at Albania Dental Clinic, from the first consultation to their new smile.",
      keywords: ["dental tourism reviews", "Albania dentist reviews", "patient testimonials"],
    },
  },

  "/prices": {
    sq: {
      title: "Çmimet e implanteve dhe trajtimeve dentare",
      description:
        "Krahasoni çmimet e implanteve, All-on-4, kurorave të zirkonit dhe faseteve me Mbretërinë e Bashkuar, Italinë dhe Turqinë. Kërkoni ofertën tuaj.",
      keywords: ["çmime dentisti Vlorë", "çmimi i implantit", "sa kushton implanti", "çmim All-on-4", "çmim kurore zirkoni", "çmim fasete", "dentist çmime"],
    },
    it: {
      title: "Dentista Albania prezzi – costo impianti, All-on-4, corone",
      description:
        "Confronta i prezzi di impianti, All-on-4, corone in zirconio e faccette con Italia, Regno Unito e Turchia. Risparmia fino all'80%. Richiedi il preventivo.",
      keywords: ["prezzi dentista Valona", "impianti dentali Valona prezzi", 
        "prezzi dentista Albania",
        "dentista Albania prezzi",
        "cliniche dentali Albania prezzi",
        "quanto costa un impianto in Albania",
        "prezzo All-on-4 Albania",
        "costo impianti dentali Albania",
        "prezzo corone in zirconio",
        "prezzo faccette dentali",
        "prezzo sbiancamento dentale Albania",
        "dentista Albania vs Italia",
      ],
    },
    en: {
      title: "Dental Implant Prices in Albania vs UK & Italy",
      description:
        "Compare prices for implants, All-on-4, zirconia crowns and veneers with the UK, Italy and Turkey. Save up to 80% on dental work. Request your quote.",
      keywords: ["dentist prices Vlore", "dental implants Vlora cost", 
        "dental implant cost Albania",
        "All-on-4 price Albania",
        "Albania dentist prices",
        "zirconia crown price",
        "veneers price Albania",
        "dental implants abroad cost",
        "Albania vs Turkey teeth prices",
      ],
    },
  },

  "/blog": {
    sq: {
      title: "Blog – implante, dhëmbë në një ditë, turizëm dentar",
      description:
        "Artikuj të qartë për implantet dentare, dhëmbët në një ditë, kujdesin pas trajtimit dhe turizmin dentar në Shqipëri, nga ekipi i Albania Dental Clinic.",
      keywords: ["blog dentar", "artikuj për implantet", "këshilla dentare", "kujdesi pas implantit"],
    },
    it: {
      title: "Blog – impianti, denti in un giorno, turismo dentale",
      description:
        "Articoli chiari su impianti dentali, denti in un giorno, cura dopo l'intervento e turismo dentale in Albania, scritti dal team di Albania Dental Clinic.",
      keywords: ["blog dentista", "articoli impianti dentali", "consigli dentista", "turismo dentale guida"],
    },
    en: {
      title: "Blog – Dental Implants, Same-Day Teeth & Dental Tourism",
      description:
        "Clear articles about dental implants, same-day teeth, aftercare and dental tourism in Albania, written by the Albania Dental Clinic team.",
      keywords: ["dental blog", "dental implant articles", "dental tips", "dental tourism guide"],
    },
  },

  "/book": {
    sq: {
      title: "Rezervoni konsultën – dërgoni radiografinë",
      description:
        "Dërgoni kërkesën dhe radiografinë panoramike: ju përgjigjemi me një vlerësim të parë dhe plan personal trajtimi. Shqip, italisht ose anglisht.",
      keywords: ["dentist Vlorë takim", "rezervo dentist", "konsultë dentare", "takim te dentisti", "vlerësim implanti"],
    },
    it: {
      title: "Prenota una consulenza – invia la tua panoramica",
      description:
        "Invia la richiesta e la panoramica: ti rispondiamo con una prima valutazione e un piano di cura personale. In italiano, via email o WhatsApp.",
      keywords: ["prenota dentista Valona", "prenota dentista Albania", "consulenza implantare", "preventivo impianti dentali", "valutazione panoramica online"],
    },
    en: {
      title: "Book a Consultation – Send Your X-ray",
      description:
        "Send your request and panoramic X-ray: we reply with a first assessment and a personal treatment plan, by email or WhatsApp.",
      keywords: ["book dentist Vlore", "book dentist Albania", "dental implant consultation", "dental quote online", "online X-ray assessment"],
    },
  },

  "/contact": {
    sq: {
      title: "Kontakt – klinikë dentare në Vlorë",
      description:
        "Kontaktoni Albania Dental Clinic në Vlorë me telefon, WhatsApp ose email, në shqip, italisht ose anglisht. Adresa, orari dhe harta.",
      keywords: ["dentist Vlorë", "klinikë dentare Vlorë adresa", "kontakt dentist", "numri i dentistit", "adresa e klinikës dentare", "orari i klinikës"],
    },
    it: {
      title: "Contatti – dentista a Valona che parla italiano",
      description:
        "Contatta Albania Dental Clinic a Valona (Vlorë) per telefono, WhatsApp o email, in italiano, albanese o inglese. Indirizzo, orari e mappa.",
      keywords: ["dentista Valona", "dentista Vlora contatti", "contatti dentista Albania", "dentista italiano Albania", "telefono clinica dentale"],
    },
    en: {
      title: "Contact – English-Speaking Dentist in Vlorë",
      description:
        "Contact Albania Dental Clinic in Vlorë, Albania, by phone, WhatsApp or email, in English, Italian or Albanian. Address, opening hours and map.",
      keywords: ["dentist Vlore", "dental clinic Vlora address", "contact dentist Albania", "English speaking dentist Albania", "dental clinic phone number"],
    },
  },
};

/* ----------------------------------------------------- Treatment categories */

export const categorySeo: Record<string, LocalizedSeo> = {
  implantology: {
    sq: {
      title: "Implantologji – implante dentare në Shqipëri",
      description:
        "Implante të vetme dhe të shumëfishta, All-on-4, All-on-6, shtim kocke dhe sinus lift, të planifikuara me CBCT 3D dhe kirurgji të drejtuar.",
      keywords: ["implante Vlorë", "implantologji", "implante dentare", "implant dentar çmim", "All-on-4", "All-on-6", "sinus lift"],
    },
    it: {
      title: "Impianti dentali in Albania – implantologia a Valona",
      description:
        "Impianti dentali in Albania: singoli e multipli, All-on-4, All-on-6, innesto osseo e rialzo del seno, con TAC 3D e chirurgia guidata. Chiedi il costo.",
      keywords: ["impianti dentali Valona", "implantologia Albania", "impianti dentali Albania", "costo impianti dentali Albania", "impianto dentale prezzo", "rifare i denti in Albania", "All-on-4", "All-on-6", "rialzo del seno"],
    },
    en: {
      title: "Implantology – Dental Implants in Albania",
      description:
        "Single and multiple implants, All-on-4, All-on-6, bone grafting and sinus lift, planned with 3D CBCT and guided surgery.",
      keywords: ["dental implants Vlore", "implantology", "dental implants Albania", "dental implant cost", "All-on-4", "All-on-6", "sinus lift"],
    },
  },
  "digital-implant": {
    sq: {
      title: "Implantologji dixhitale – CBCT 3D dhe kirurgji e drejtuar",
      description:
        "Skaner 3D, mbresa dixhitale, kirurgji e drejtuar dhe Digital Smile Design: implante më të sakta dhe më pak invazive.",
      keywords: ["implantologji dixhitale", "kirurgji e drejtuar", "CBCT 3D", "mbresa dixhitale", "Digital Smile Design"],
    },
    it: {
      title: "Implantologia digitale – TAC 3D e chirurgia guidata",
      description:
        "TAC 3D, impronte digitali, chirurgia guidata e Digital Smile Design: impianti più precisi e meno invasivi.",
      keywords: ["implantologia digitale", "chirurgia guidata", "TAC 3D", "impronte digitali", "Digital Smile Design"],
    },
    en: {
      title: "Digital Implantology – 3D CBCT & Guided Surgery",
      description:
        "3D CBCT, digital impressions, guided surgery and Digital Smile Design: more precise, less invasive implants.",
      keywords: ["digital implantology", "guided implant surgery", "3D CBCT", "digital impressions", "Digital Smile Design"],
    },
  },
  aesthetic: {
    sq: {
      title: "Stomatologji estetike – fasete, kurora zirkoni, zbardhim",
      description:
        "Fasete, kurora zirkoni, ura dhe zbardhim profesional i dhëmbëve, të projektuara në laboratorin tonë për një buzëqeshje natyrale.",
      keywords: ["stomatologji estetike", "fasete", "kurora zirkoni", "zbardhim dhëmbësh", "buzëqeshje Hollywood"],
    },
    it: {
      title: "Estetica dentale – faccette, corone zirconio, sbiancamento",
      description:
        "Faccette, corone in zirconio, ponti e sbiancamento professionale, progettati nel nostro laboratorio per un sorriso naturale.",
      keywords: ["estetica dentale Albania", "faccette dentali", "faccette dentali Albania", "corone in zirconio", "sbiancamento denti", "sbiancamento dentale Albania", "Hollywood smile Albania"],
    },
    en: {
      title: "Cosmetic Dentistry – Veneers, Zirconia Crowns, Whitening",
      description:
        "Veneers, zirconia crowns, bridges and professional teeth whitening, designed in our own lab for a natural-looking smile.",
      keywords: ["cosmetic dentistry Albania", "veneers Albania", "zirconia crowns", "teeth whitening", "Hollywood smile Albania"],
    },
  },
  general: {
    sq: {
      title: "Stomatologji e përgjithshme – kanal, kirurgji, higjienë",
      description:
        "Mjekim kanali, heqje dhëmbësh dhe dhëmbë pjekurie, pastrim profesional dhe stomatologji për fëmijë, me kujdes dhe butësi.",
      keywords: ["stomatologji e përgjithshme", "mjekim kanali", "heqje dhëmbi", "dhëmbi i pjekurisë", "pastrim dhëmbësh", "dentist për fëmijë"],
    },
    it: {
      title: "Odontoiatria generale – endodonzia, chirurgia, igiene",
      description:
        "Devitalizzazione, estrazioni e denti del giudizio, igiene professionale e pedodonzia, con attenzione e delicatezza.",
      keywords: ["odontoiatria generale", "devitalizzazione", "estrazione dente", "dente del giudizio", "pulizia denti", "dentista bambini"],
    },
    en: {
      title: "General Dentistry – Root Canal, Surgery, Hygiene",
      description:
        "Root canal treatment, extractions and wisdom teeth, professional cleaning and children's dentistry, with gentle, careful treatment.",
      keywords: ["general dentistry", "root canal treatment", "tooth extraction", "wisdom tooth removal", "teeth cleaning", "children's dentist"],
    },
  },
};

/* ------------------------------------------------------------- Treatments */

export const treatmentSeo: Record<string, LocalizedSeo> = {
  "single-implant": {
    sq: {
      title: "Implant dentar i vetëm – zëvendësoni një dhëmb",
      description:
        "Një implant titani dhe një kurorë e bërë në laboratorin tonë zëvendësojnë dhëmbin që mungon, pa prekur dhëmbët fqinjë. Planifikim me CBCT 3D.",
      keywords: ["implant dentar Vlorë", "implant dentar", "implant i vetëm", "çmimi i implantit", "implant titani", "implant me kurorë", "dhëmb që mungon"],
    },
    it: {
      title: "Impianto dentale singolo in Albania – prezzo e procedura",
      description:
        "Un impianto in titanio e una corona fatta nel nostro laboratorio sostituiscono il dente mancante senza toccare i denti vicini. Pianificazione con TAC 3D.",
      keywords: ["impianto dentale Valona", "impianto dentale singolo", "impianto dentale Albania", "prezzo impianto dentale", "impianto con corona", "sostituire un dente", "impianto in titanio"],
    },
    en: {
      title: "Single Dental Implant in Albania – Replace One Tooth",
      description:
        "A titanium implant and a crown made in our lab replace a missing tooth without touching the neighbouring teeth. Planned with 3D CBCT.",
      keywords: ["dental implant Vlore", "single dental implant", "dental implant Albania", "dental implant cost", "implant with crown", "replace missing tooth", "titanium implant"],
    },
  },
  "multiple-implants": {
    sq: {
      title: "Implante të shumëfishta – disa dhëmbë që mungojnë",
      description:
        "Disa dhëmbë që mungojnë restaurohen mbi pak implante me kurora fikse ose urë, të planifikuara në 3D për rezultat të qëndrueshëm.",
      keywords: ["implante të shumëfishta", "urë mbi implante", "disa dhëmbë që mungojnë", "implante dentare"],
    },
    it: {
      title: "Impianti dentali multipli – più denti mancanti",
      description:
        "Più denti mancanti ripristinati su pochi impianti con corone fisse o un ponte, pianificati in 3D per un risultato stabile nel tempo.",
      keywords: ["impianti multipli", "ponte su impianti", "più denti mancanti", "impianti dentali Albania"],
    },
    en: {
      title: "Multiple Dental Implants – Several Missing Teeth",
      description:
        "Several missing teeth restored on a small number of implants with fixed crowns or a bridge, planned in 3D for a stable, lasting result.",
      keywords: ["multiple dental implants", "implant bridge", "several missing teeth", "dental implants Albania"],
    },
  },
  "all-on-4": {
    sq: {
      title: "All-on-4 në Shqipëri – hark i plotë mbi 4 implante",
      description:
        "Një hark i plotë dhëmbësh fiks mbi katër implante. Në rastet e përshtatshme, dhëmbët provizorë fiks vendosen në të njëjtën ditë.",
      keywords: ["All-on-4 Vlorë", "All-on-4", "All-on-4 Shqipëri", "çmim All-on-4", "dhëmbë fiks mbi implante", "zëvendësim proteze", "dhëmbë në një ditë"],
    },
    it: {
      title: "All-on-4 in Albania – arcata fissa su 4 impianti",
      description:
        "Un'arcata completa di denti fissi su quattro impianti. Nei casi idonei i denti provvisori fissi vengono posizionati lo stesso giorno.",
      keywords: ["All-on-4 Valona", "All-on-4 Albania", "prezzo All-on-4", "arcata completa su 4 impianti", "denti fissi su impianti", "addio dentiera", "carico immediato"],
    },
    en: {
      title: "All-on-4 in Albania – Full Arch on 4 Implants",
      description:
        "A complete fixed arch supported by four implants. In suitable cases, fixed provisional teeth are placed on the same day.",
      keywords: ["All-on-4 Vlore", "All-on-4 Albania", "All-on-4 cost", "full arch dental implants", "fixed teeth on implants", "denture replacement", "teeth in a day"],
    },
  },
  "all-on-6": {
    sq: {
      title: "All-on-6 – hark fiks mbi 6 implante",
      description:
        "Një hark i plotë fiks mbi gjashtë implante për më shumë mbështetje dhe stabilitet, ideal kur vëllimi i kockës e lejon.",
      keywords: ["All-on-6", "All-on-6 Shqipëri", "çmim All-on-6", "hark i plotë implante", "All-on-4 apo All-on-6"],
    },
    it: {
      title: "All-on-6 in Albania – arcata fissa su 6 impianti",
      description:
        "Un'arcata completa fissa su sei impianti per maggiore supporto e stabilità, ideale quando il volume osseo lo permette.",
      keywords: ["All-on-6 Albania", "prezzo All-on-6", "arcata completa su 6 impianti", "All-on-4 o All-on-6"],
    },
    en: {
      title: "All-on-6 in Albania – Full Arch on 6 Implants",
      description:
        "A full fixed arch on six implants for extra support and stability, ideal when bone volume allows it.",
      keywords: ["All-on-6 Albania", "All-on-6 cost", "full arch on 6 implants", "All-on-4 vs All-on-6"],
    },
  },
  "replacing-old-bridges": {
    sq: {
      title: "Zëvendësimi i urave të vjetra me implante",
      description:
        "Urat e vjetra që dështojnë ose nuk duken mirë hiqen dhe zëvendësohen me restaurime mbi implante që zgjasin.",
      keywords: ["zëvendësim ure", "urë e vjetër", "urë mbi implante", "riparim ure dentare"],
    },
    it: {
      title: "Sostituzione di vecchi ponti con impianti",
      description:
        "Vecchi ponti che cedono o antiestetici vengono rimossi e sostituiti con riabilitazioni su impianti che durano nel tempo.",
      keywords: ["sostituire vecchio ponte", "rifare il ponte dentale", "ponte su impianti", "ponte dentale rotto"],
    },
    en: {
      title: "Replacing Old Bridges with Dental Implants",
      description:
        "Failing or unattractive old bridges are removed and replaced with implant-supported restorations built to last.",
      keywords: ["replace old dental bridge", "failed bridge", "implant supported bridge", "bridge replacement"],
    },
  },
  "bone-grafting-sinus-lift": {
    sq: {
      title: "Shtim kocke dhe sinus lift për implante",
      description:
        "Kur kocka nuk mjafton, teknikat rigjeneruese rindërtojnë vëllimin e nevojshëm për të vendosur implantet në mënyrë të sigurt.",
      keywords: ["shtim kocke", "grafting kockor", "sinus lift", "implante pa kockë", "rigjenerim kockor"],
    },
    it: {
      title: "Innesto osseo e rialzo del seno mascellare",
      description:
        "Quando l'osso non basta, le tecniche rigenerative ricostruiscono il volume necessario per inserire gli impianti in sicurezza.",
      keywords: ["innesto osseo", "rialzo del seno mascellare", "grande rialzo del seno", "impianti con poco osso", "rigenerazione ossea"],
    },
    en: {
      title: "Bone Grafting & Sinus Lift for Implants",
      description:
        "When bone is insufficient, regenerative techniques rebuild the volume needed to place dental implants safely.",
      keywords: ["bone grafting", "dental bone graft", "sinus lift", "implants with bone loss", "bone regeneration"],
    },
  },
  "3d-ct-scan": {
    sq: {
      title: "Skaner dentar 3D CBCT",
      description:
        "Skaneri tredimensional CBCT tregon kockën, nervat dhe sinuset në detaje – baza e çdo plani implantesh në Albania Dental Clinic.",
      keywords: ["CBCT", "skaner 3D dentar", "tomografi dentare", "radiografi 3D"],
    },
    it: {
      title: "TAC dentale 3D CBCT in Albania",
      description:
        "La TAC tridimensionale CBCT mostra osso, nervi e seni mascellari nel dettaglio: la base di ogni piano implantare.",
      keywords: ["TAC dentale", "TAC 3D CBCT", "cone beam", "radiografia 3D denti"],
    },
    en: {
      title: "3D CBCT Dental Scan in Albania",
      description:
        "A three-dimensional CBCT scan shows bone, nerves and sinuses in detail – the foundation of every dental implant plan.",
      keywords: ["CBCT scan", "3D dental scan", "cone beam CT", "dental CT scan"],
    },
  },
  "digital-impressions": {
    sq: {
      title: "Mbresa dixhitale – skaner intraoral",
      description:
        "Skaneri intraoral zëvendëson pastën tradicionale të mbresave: i shpejtë, i saktë dhe shumë më i rehatshëm.",
      keywords: ["mbresa dixhitale", "skaner intraoral", "mbresë pa pastë"],
    },
    it: {
      title: "Impronte digitali – scanner intraorale",
      description:
        "Lo scanner intraorale sostituisce la pasta delle impronte tradizionali: veloce, preciso e molto più confortevole.",
      keywords: ["impronte digitali dentali", "scanner intraorale", "impronta senza pasta"],
    },
    en: {
      title: "Digital Dental Impressions – Intraoral Scanner",
      description:
        "An intraoral scanner replaces traditional impression paste: fast, precise and far more comfortable.",
      keywords: ["digital dental impressions", "intraoral scanner", "impressions without putty"],
    },
  },
  "guided-surgery": {
    sq: {
      title: "Kirurgji e drejtuar e implanteve",
      description:
        "Implantet planifikohen në kompjuter dhe vendosen me një udhëzues kirurgjik për saktësi më të madhe dhe shërim më të shpejtë.",
      keywords: ["kirurgji e drejtuar", "implante me udhëzues", "implantologji kompjuterike"],
    },
    it: {
      title: "Chirurgia implantare guidata – precisa e mininvasiva",
      description:
        "Gli impianti vengono pianificati al computer e inseriti con una guida chirurgica per maggiore precisione e guarigione più rapida.",
      keywords: ["chirurgia guidata", "implantologia guidata", "implantologia computer guidata"],
    },
    en: {
      title: "Guided Implant Surgery – Precise & Minimally Invasive",
      description:
        "Implants are planned on a computer and placed through a surgical guide for greater precision and faster healing.",
      keywords: ["guided implant surgery", "computer guided implants", "minimally invasive implants"],
    },
  },
  "digital-smile-design": {
    sq: {
      title: "Digital Smile Design – projektoni buzëqeshjen tuaj",
      description:
        "Buzëqeshja e re projektohet dixhitalisht në harmoni me fytyrën tuaj, që ta shihni rezultatin para se të nisni trajtimin.",
      keywords: ["Digital Smile Design", "projektim buzëqeshjeje", "buzëqeshje e re", "estetikë dentare"],
    },
    it: {
      title: "Digital Smile Design – progetta il tuo sorriso",
      description:
        "Il nuovo sorriso viene progettato digitalmente in armonia con il viso, così vedi il risultato prima di iniziare le cure.",
      keywords: ["Digital Smile Design", "progettazione del sorriso", "nuovo sorriso", "estetica dentale"],
    },
    en: {
      title: "Digital Smile Design – Preview Your New Smile",
      description:
        "Your new smile is designed digitally in harmony with your face, so you can see the result before treatment starts.",
      keywords: ["Digital Smile Design", "smile makeover", "smile design Albania", "cosmetic dentistry"],
    },
  },
  "zirconia-crowns": {
    sq: {
      title: "Kurora zirkoni – pa metal, me pamje natyrale",
      description:
        "Kurora zirkoni të forta dhe pa metal, të projektuara dhe frezuara në laboratorin tonë për një pamje natyrale dhe të qëndrueshme.",
      keywords: ["kurora zirkoni Vlorë", "kurora zirkoni", "çmim kurore zirkoni", "kurorë pa metal", "kurora porcelani", "kapsula dhëmbësh"],
    },
    it: {
      title: "Corone in zirconio in Albania – prezzo e qualità",
      description:
        "Corone in zirconio resistenti e senza metallo, progettate e fresate nel nostro laboratorio per un aspetto naturale e duraturo.",
      keywords: ["corone in zirconio Valona", "corone in zirconio", "corone in zirconio Albania", "prezzo corona zirconio", "capsule dentali", "corone senza metallo"],
    },
    en: {
      title: "Zirconia Crowns in Albania – Metal-Free & Natural",
      description:
        "Strong, metal-free zirconia crowns designed and milled in our own laboratory for a natural, long-lasting look.",
      keywords: ["zirconia crowns Vlore", "zirconia crowns", "zirconia crowns Albania", "zirconia crown cost", "dental crowns abroad", "metal-free crowns"],
    },
  },
  veneers: {
    sq: {
      title: "Fasete dentare – buzëqeshje Hollywood",
      description:
        "Fasete qeramike të holla që korrigjojnë formën, ngjyrën dhe hapësirat e vogla me përgatitje minimale. Buzëqeshje natyrale dhe e ndritshme.",
      keywords: ["fasete Vlorë", "fasete", "fasete dentare", "fasete porcelani", "çmim fasete", "buzëqeshje Hollywood", "fasete E-max"],
    },
    it: {
      title: "Faccette dentali in Albania – Hollywood smile",
      description:
        "Faccette dentali in Albania: sottili gusci in ceramica che correggono forma, colore e piccoli spazi con preparazione minima, per un sorriso naturale.",
      keywords: ["faccette dentali Valona", "faccette dentali Albania", "faccette in ceramica", "prezzo faccette dentali", "Hollywood smile", "faccette E-max"],
    },
    en: {
      title: "Porcelain Veneers in Albania – Hollywood Smile",
      description:
        "Thin ceramic veneers that correct shape, colour and small gaps with minimal preparation, for a natural, bright smile.",
      keywords: ["veneers Vlore", "veneers Albania", "porcelain veneers", "veneers cost abroad", "Hollywood smile", "E-max veneers"],
    },
  },
  bridges: {
    sq: {
      title: "Ura dentare fikse",
      description:
        "Ura fikse që zëvendësojnë një ose më shumë dhëmbë, të bëra me saktësi në laboratorin tonë dixhital, në zirkon ose qeramikë.",
      keywords: ["urë dentare", "urë fikse", "urë zirkoni", "çmim ure dentare"],
    },
    it: {
      title: "Ponti dentali fissi in zirconio",
      description:
        "Ponti fissi che sostituiscono uno o più denti, realizzati con precisione nel nostro laboratorio digitale, in zirconio o ceramica.",
      keywords: ["ponte dentale", "ponte fisso", "ponte in zirconio", "prezzo ponte dentale"],
    },
    en: {
      title: "Fixed Dental Bridges in Zirconia",
      description:
        "Fixed bridges that replace one or more teeth, made with precision in our digital lab in zirconia or ceramic.",
      keywords: ["dental bridge", "fixed bridge", "zirconia bridge", "dental bridge cost"],
    },
  },
  "teeth-whitening": {
    sq: {
      title: "Zbardhim profesional i dhëmbëve",
      description:
        "Zbardhim profesional që ndriçon buzëqeshjen në mënyrë të sigurt nën mbikëqyrje klinike.",
      keywords: ["zbardhim dhëmbësh", "zbardhim profesional", "dhëmbë të bardhë", "çmim zbardhimi"],
    },
    it: {
      title: "Sbiancamento dentale in Albania – professionale",
      description:
        "Sbiancamento dentale professionale in Albania, a Valona: illumina il sorriso in sicurezza sotto controllo clinico. Chiedi un preventivo.",
      keywords: ["sbiancamento dentale Albania", "sbiancamento denti Valona", "sbiancamento denti", "sbiancamento professionale", "denti bianchi", "prezzo sbiancamento"],
    },
    en: {
      title: "Professional Teeth Whitening",
      description:
        "Professional whitening that safely brightens your smile under clinical supervision.",
      keywords: ["teeth whitening", "professional teeth whitening", "whiter teeth", "teeth whitening cost"],
    },
  },
  endodontics: {
    sq: {
      title: "Mjekim kanali (endodonti) – shpëtoni dhëmbin",
      description:
        "Mjekimi i kanalit shpëton dhëmbin natyral dhe largon dhimbjen dhe infeksionin. Trajtim i saktë me radiografi dixhitale.",
      keywords: ["mjekim kanali", "endodonti", "devitalizim", "dhimbje dhëmbi", "infeksion dhëmbi"],
    },
    it: {
      title: "Devitalizzazione ed endodonzia – salva il dente",
      description:
        "La cura canalare salva il dente naturale ed elimina dolore e infezione. Trattamento preciso con radiografia digitale.",
      keywords: ["devitalizzazione", "endodonzia", "cura canalare", "mal di denti", "ascesso dentale"],
    },
    en: {
      title: "Root Canal Treatment (Endodontics)",
      description:
        "Root canal treatment saves your natural tooth and removes pain and infection, with precise digital X-ray guidance.",
      keywords: ["root canal treatment", "endodontics", "toothache", "tooth infection", "save natural tooth"],
    },
  },
  "oral-surgery": {
    sq: {
      title: "Kirurgji orale – heqje dhëmbësh dhe dhëmbë pjekurie",
      description:
        "Heqje dhëmbësh, dhëmbë pjekurie dhe kirurgji e vogël orale, të kryera me kujdes, saktësi dhe anestezi lokale.",
      keywords: ["kirurgji orale", "heqje dhëmbi", "dhëmbi i pjekurisë", "heqje e dhëmbit të pjekurisë"],
    },
    it: {
      title: "Chirurgia orale – estrazioni e denti del giudizio",
      description:
        "Estrazioni, denti del giudizio e piccola chirurgia orale eseguiti con cura, precisione e anestesia locale.",
      keywords: ["chirurgia orale", "estrazione dente", "dente del giudizio", "estrazione dente del giudizio"],
    },
    en: {
      title: "Oral Surgery – Extractions & Wisdom Teeth",
      description:
        "Extractions, wisdom teeth and minor oral surgery performed with care and precision under local anaesthetic.",
      keywords: ["oral surgery", "tooth extraction", "wisdom tooth removal", "wisdom teeth Albania"],
    },
  },
  hygiene: {
    sq: {
      title: "Higjienë dentare – pastrim profesional i dhëmbëve",
      description:
        "Pastrim profesional, heqje gurëzash dhe parandalim për të mbajtur mishrat dhe implantet të shëndetshme për një kohë të gjatë.",
      keywords: ["pastrim dhëmbësh", "higjienë dentare", "heqje gurëzash", "mishra që gjakosen"],
    },
    it: {
      title: "Igiene dentale – pulizia professionale dei denti",
      description:
        "Pulizia professionale, rimozione del tartaro e prevenzione per mantenere gengive e impianti sani nel tempo.",
      keywords: ["pulizia denti", "igiene dentale", "detartrasi", "gengive che sanguinano"],
    },
    en: {
      title: "Dental Hygiene – Professional Teeth Cleaning",
      description:
        "Professional cleaning, tartar removal and prevention to keep your gums and implants healthy for the long term.",
      keywords: ["teeth cleaning", "dental hygiene", "scale and polish", "bleeding gums"],
    },
  },
  children: {
    sq: {
      title: "Stomatologji për fëmijë – dentist i butë për fëmijët",
      description:
        "Kujdes i butë dhe i durueshëm që i ndihmon fëmijët të ndihen të sigurt te dentisti që në vizitën e parë.",
      keywords: ["dentist për fëmijë", "stomatologji pediatrike", "dhëmbë qumështi", "vizita e parë te dentisti"],
    },
    it: {
      title: "Dentista per bambini – pedodonzia",
      description:
        "Cure delicate e pazienti che aiutano i bambini a sentirsi al sicuro dal dentista fin dalla prima visita.",
      keywords: ["dentista per bambini", "pedodonzia", "denti da latte", "prima visita dal dentista"],
    },
    en: {
      title: "Children's Dentist – Gentle Paediatric Dentistry",
      description:
        "Gentle, patient care that helps children feel safe at the dentist from their very first visit.",
      keywords: ["children's dentist", "paediatric dentistry", "baby teeth", "first dental visit"],
    },
  },
};

/** Keywords added to every page in each language (brand + core searches). */
export const baseKeywords: Record<AppLocale, string[]> = {
  sq: ["Albania Dental Clinic", "klinikë dentare", "klinika dentare Vlorë", "dentist Shqipëri", "dentist Vlorë"],
  it: ["Albania Dental Clinic", "dentista Albania", "clinica dentale Albania", "impianti dentali Albania", "dentista Valona"],
  en: ["Albania Dental Clinic", "dentist Albania", "dental clinic Albania", "dentist Vlore"],
};
