import type { JournalPost } from "./types";

// Keep at least one entry (cacheComponents requires non-empty generateStaticParams).
// Paragraphs in `body` are separated by a blank line.
export const journalPosts: JournalPost[] = [
  {
    slug: "what-are-same-day-teeth",
    title: {
      sq: "Dhëmbë në një ditë: si funksionon në të vërtetë",
      it: "Denti in un giorno: come funziona davvero",
      en: "Same-day teeth: how it really works",
    },
    excerpt: {
      sq: "Nga skanimi 3D te dhëmbët fiks në të njëjtën ditë — çfarë ndodh, për kë është dhe pse kërkon një laborator në klinikë.",
      it: "Dalla TAC 3D ai denti fissi nello stesso giorno: cosa succede, per chi è e perché serve un laboratorio in clinica.",
      en: "From 3D scan to fixed teeth on the same day — what happens, who it is for and why it needs an in-house lab.",
    },
    body: {
      sq: "Për shumë njerëz, humbja e dhëmbëve do të thotë muaj me protezë të lëvizshme. Trajtimi me dhëmbë në një ditë e ndryshon këtë: një hark i plotë dhëmbësh fiks vendoset mbi katër ose gjashtë implante menjëherë pas ndërhyrjes.\n\nGjithçka fillon me një tomografi 3D CBCT. Ajo na tregon sa kockë keni dhe ku kalojnë nervat e sinuset. Mbi këtë skanim planifikojmë digjitalisht pozicionin e implanteve dhe formën e dhëmbëve të rinj.\n\nNë ditën e ndërhyrjes, me anestezi lokale, hiqen dhëmbët që nuk mund të shpëtohen dhe vendosen implantet. Ndërkohë laboratori ynë përgatit urën fikse të përkohshme, e cila fiksohet po atë ditë. Pas disa muajsh shërimi, ajo zëvendësohet me urën përfundimtare.\n\nNgarkimi i menjëhershëm nuk është i mundur për të gjithë: kërkon kockë të mjaftueshme dhe shëndet të mirë të përgjithshëm. Prandaj vendimi merret gjithmonë pas skanimit 3D dhe vizitës klinike.",
      it: "Per molte persone perdere i denti significa mesi con una protesi mobile. Il trattamento dei denti in un giorno cambia tutto: un'arcata completa di denti fissi viene applicata su quattro o sei impianti subito dopo l'intervento.\n\nTutto inizia con una TAC 3D CBCT. Ci mostra quanto osso hai e dove passano nervi e seni. Su questa scansione pianifichiamo in digitale la posizione degli impianti e la forma dei nuovi denti.\n\nIl giorno dell'intervento, in anestesia locale, si estraggono i denti non recuperabili e si inseriscono gli impianti. Nel frattempo il nostro laboratorio prepara il ponte fisso provvisorio, che viene fissato lo stesso giorno. Dopo alcuni mesi di guarigione viene sostituito dal ponte definitivo.\n\nIl carico immediato non è possibile per tutti: richiede osso sufficiente e una buona salute generale. Per questo la decisione si prende sempre dopo la TAC 3D e la visita clinica.",
      en: "For many people, losing teeth means months with a removable denture. Same-day teeth change that: a complete arch of fixed teeth is attached to four or six implants right after surgery.\n\nEverything starts with a 3D CBCT scan. It shows how much bone you have and where nerves and sinuses run. On this scan we digitally plan the implant positions and the shape of your new teeth.\n\nOn the day of surgery, under local anaesthesia, teeth that cannot be saved are removed and the implants are placed. Meanwhile our laboratory prepares the fixed provisional bridge, which is attached that same day. After a few months of healing it is replaced by the final bridge.\n\nImmediate loading is not possible for everyone: it needs enough bone and good general health. That is why the decision is always made after the 3D scan and a clinical examination.",
    },
    publishedAt: "2026-10-20",
    coverImage: "/images/results/case-1-after.jpg",
    locales: ["sq", "it", "en"],
  },
  {
    slug: "why-3d-ct-before-implants",
    title: {
      sq: "Pse tomografia 3D është e domosdoshme para implanteve",
      it: "Perché la TAC 3D è indispensabile prima degli impianti",
      en: "Why a 3D CT scan is essential before implants",
    },
    excerpt: {
      sq: "Një radiografi e thjeshtë nuk mjafton. Ja çfarë na tregon skanimi 3D dhe si e bën ndërhyrjen më të sigurt.",
      it: "Una semplice radiografia non basta. Ecco cosa ci mostra la TAC 3D e come rende l'intervento più sicuro.",
      en: "A simple X-ray is not enough. Here is what a 3D scan shows us and how it makes surgery safer.",
    },
    body: {
      sq: "Ortopanoramika është e dobishme, por tregon gojën vetëm në dy dimensione. Për një implant na duhet të dimë edhe gjerësinë e kockës, densitetin e saj dhe distancën e saktë nga nervat dhe sinuset.\n\nTomografia CBCT (Cone Beam CT) e jep këtë informacion në pak sekonda, me një dozë rrezatimi shumë më të ulët se një CT mjekësore tradicionale. Rezultati është një model 3D i nofullave që mund ta rrotullojmë dhe ta matim në ekran.\n\nMbi këtë model planifikojmë implantet virtualisht dhe, kur duhet, përgatisim një udhëzues kirurgjikal. Kështu ndërhyrja është më e saktë, prerjet më të vogla dhe shërimi më i rehatshëm.\n\nNë Albania Dental Clinic skaneri CBCT ndodhet brenda klinikës: nuk ka nevojë të shkoni në një qendër tjetër dhe rezultati është gati menjëherë.",
      it: "La panoramica è utile, ma mostra la bocca solo in due dimensioni. Per un impianto dobbiamo conoscere anche lo spessore dell'osso, la sua densità e la distanza esatta da nervi e seni.\n\nLa TAC CBCT (Cone Beam CT) fornisce queste informazioni in pochi secondi, con una dose di radiazioni molto più bassa di una TAC medica tradizionale. Il risultato è un modello 3D delle arcate che possiamo ruotare e misurare sullo schermo.\n\nSu questo modello pianifichiamo gli impianti virtualmente e, quando serve, prepariamo una guida chirurgica. Così l'intervento è più preciso, le incisioni più piccole e la guarigione più confortevole.\n\nAd Albania Dental Clinic lo scanner CBCT si trova all'interno della clinica: non devi andare in un altro centro e il risultato è subito disponibile.",
      en: "A panoramic X-ray is useful, but it shows the mouth in only two dimensions. For an implant we also need to know the width of the bone, its density and the exact distance from nerves and sinuses.\n\nA CBCT (Cone Beam CT) scan provides this information in a few seconds, with a much lower radiation dose than a traditional medical CT. The result is a 3D model of the jaws that we can rotate and measure on screen.\n\nOn this model we plan the implants virtually and, when needed, prepare a surgical guide. Surgery is therefore more precise, incisions are smaller and recovery is more comfortable.\n\nAt Albania Dental Clinic the CBCT scanner is inside the clinic: there is no need to go to another centre, and the result is ready immediately.",
    },
    publishedAt: "2026-09-15",
    coverImage: "/images/clinic/tech-3d-ct-scan.jpg",
    locales: ["sq", "it", "en"],
  },
  {
    slug: "dental-tourism-albania-guide",
    title: {
      sq: "Turizmi dentar në Shqipëri: si ta planifikoni vizitën",
      it: "Turismo dentale in Albania: come organizzare il viaggio",
      en: "Dental tourism in Albania: how to plan your visit",
    },
    excerpt: {
      sq: "Radiografia, datat, akomodimi dhe kontrollet: një udhëzues praktik për pacientët që vijnë nga larg.",
      it: "Radiografia, date, alloggio e controlli: una guida pratica per chi arriva da lontano.",
      en: "X-ray, dates, accommodation and follow-up: a practical guide for patients coming from afar.",
    },
    body: {
      sq: "Hapi i parë është gjithmonë një radiografi e fundit. Ortopanoramika na lejon t'ju japim një mendim të parë dhe një ide për numrin e ditëve që do t'ju nevojiten, edhe para se të rezervoni fluturimin.\n\nMë pas zgjidhni datat. Takimet i planifikojmë sipas mbërritjes dhe largimit tuaj, duke lënë kohë për pushim pas ndërhyrjes. Klinika ka edhe apartamentet e veta për pacientët, që të mos keni nevojë të kërkoni hotel.\n\nGjatë trajtimit, skanimi 3D, ndërhyrja dhe punimet e laboratorit bëhen të gjitha në të njëjtën klinikë. Kjo do të thotë më pak zhvendosje dhe më pak ditë larg shtëpisë.\n\nPas kthimit qëndrojmë në kontakt përmes WhatsApp dhe planifikojmë së bashku vizitën për dhëmbët përfundimtarë. Dhe nëse keni kohë, Shqipëria ia vlen të zbulohet: det, male dhe qytete historike.",
      it: "Il primo passo è sempre una radiografia recente. La panoramica ci permette di darti un primo parere e un'idea dei giorni necessari, ancora prima di prenotare il volo.\n\nPoi scegli le date. Pianifichiamo gli appuntamenti in base al tuo arrivo e alla tua partenza, lasciando tempo per riposare dopo l'intervento. La clinica dispone anche di propri appartamenti per i pazienti, così non devi cercare un hotel.\n\nDurante le cure, TAC 3D, intervento e lavori di laboratorio avvengono tutti nella stessa clinica. Questo significa meno spostamenti e meno giorni lontano da casa.\n\nDopo il rientro restiamo in contatto via WhatsApp e pianifichiamo insieme la visita per i denti definitivi. E se hai tempo, l'Albania merita di essere scoperta: mare, montagne e città storiche.",
      en: "The first step is always a recent X-ray. A panoramic image lets us give you a first opinion and an idea of how many days you will need, even before you book your flight.\n\nThen you choose your dates. We plan appointments around your arrival and departure, leaving time to rest after surgery. The clinic also has its own apartments for patients, so you do not need to look for a hotel.\n\nDuring treatment, the 3D scan, surgery and laboratory work all happen in the same clinic. That means fewer transfers and fewer days away from home.\n\nAfter you return we stay in touch on WhatsApp and plan the visit for your final teeth together. And if you have time, Albania is worth discovering: sea, mountains and historic towns.",
    },
    publishedAt: "2026-08-28",
    coverImage: "/images/clinic/treatment-room.jpg",
    locales: ["sq", "it", "en"],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((p) => p.slug === slug);
}
