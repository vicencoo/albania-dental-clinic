import type { Apartment } from "./types";

// TODO: replace with the owner's real apartments (photos, address, capacity, amenities).
// Keep at least one entry (cacheComponents requires non-empty generateStaticParams).
// Placeholder values ("[...]") and empty lists are hidden in the UI.
export const apartments: Apartment[] = [
  {
    slug: "apartment-1",
    name: {
      sq: "Apartamenti për pacientët",
      it: "Appartamento per i pazienti",
      en: "Patient apartment",
    },
    description: {
      sq: "Një apartament privat i klinikës, i rezervuar për pacientët që vijnë nga larg. Një vend i qetë për të pushuar pas ndërhyrjes dhe mes takimeve, pa menduar për hotelet.",
      it: "Un appartamento privato della clinica, riservato ai pazienti che arrivano da lontano. Un luogo tranquillo dove riposare dopo l'intervento e tra gli appuntamenti, senza pensare agli hotel.",
      en: "A private apartment owned by the clinic and reserved for patients travelling from afar. A quiet place to rest after surgery and between appointments, without thinking about hotels.",
    },
    location: "[APARTMENT_ADDRESS]",
    amenities: [],
    images: [],
    distanceToClinic: "[DISTANCE]",
  },
];

export function getApartment(slug: string) {
  return apartments.find((a) => a.slug === slug);
}
