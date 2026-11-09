import type { Faq, FaqTopic } from "./types";

// TODO: clinic to review the answers (medical accuracy, final wording).
export const faqs: Faq[] = [
  {
    id: "same-day-1",
    topic: "same-day",
    question: {
      sq: "A largohem vërtet me dhëmbë fiks në të njëjtën ditë?",
      it: "Esco davvero con denti fissi lo stesso giorno?",
      en: "Do I really leave with fixed teeth on the same day?",
    },
    answer: {
      sq: "Po, kur kocka dhe gjendja e përgjithshme shëndetësore e lejojnë. Në ditën e ndërhyrjes vendosen implantet dhe një urë fikse e përkohshme e përgatitur në laboratorin tonë. Pas shërimit, ajo zëvendësohet me urën përfundimtare.",
      it: "Sì, quando l'osso e lo stato di salute generale lo permettono. Il giorno dell'intervento vengono inseriti gli impianti e un ponte fisso provvisorio preparato nel nostro laboratorio. Dopo la guarigione viene sostituito dal ponte definitivo.",
      en: "Yes, when bone and general health allow it. On the day of surgery the implants are placed together with a fixed provisional bridge prepared in our laboratory. After healing it is replaced by the final bridge.",
    },
  },
  {
    id: "same-day-2",
    topic: "same-day",
    question: {
      sq: "A dhemb ndërhyrja?",
      it: "L'intervento fa male?",
      en: "Is the surgery painful?",
    },
    answer: {
      sq: "Ndërhyrja kryhet me anestezi lokale, ndaj gjatë saj nuk duhet të ndjeni dhimbje. Në ditët në vijim mund të ketë ënjtje dhe siklet që kontrollohen me ilaçet që ju përshkruajmë.",
      it: "L'intervento si esegue in anestesia locale, quindi durante non dovresti sentire dolore. Nei giorni successivi possono comparire gonfiore e fastidio, controllabili con i farmaci che ti prescriviamo.",
      en: "Surgery is performed under local anaesthesia, so you should not feel pain during it. In the following days some swelling and discomfort are normal and are managed with the medication we prescribe.",
    },
  },
  {
    id: "same-day-3",
    topic: "same-day",
    question: {
      sq: "Sa kohë zgjasin implantet?",
      it: "Quanto durano gli impianti?",
      en: "How long do implants last?",
    },
    answer: {
      sq: "Me higjienë të mirë dhe kontrolle të rregullta, implantet mund të zgjasin për shumë vite. Duhanpirja dhe higjiena e dobët janë rreziqet kryesore.",
      it: "Con una buona igiene e controlli regolari, gli impianti possono durare molti anni. Fumo e scarsa igiene sono i rischi principali.",
      en: "With good hygiene and regular check-ups, implants can last for many years. Smoking and poor hygiene are the main risks.",
    },
  },
  {
    id: "treatments-1",
    topic: "treatments",
    question: {
      sq: "Pse më duhet një tomografi 3D?",
      it: "Perché mi serve una TAC 3D?",
      en: "Why do I need a 3D CT scan?",
    },
    answer: {
      sq: "Radiografia e zakonshme tregon vetëm dy dimensione. Tomografia 3D CBCT na lejon të matim lartësinë dhe gjerësinë e kockës dhe të shohim nervat dhe sinuset, për të vendosur implantet në mënyrë të sigurt dhe të saktë.",
      it: "La radiografia normale mostra solo due dimensioni. La TAC 3D CBCT ci permette di misurare altezza e spessore dell'osso e di vedere nervi e seni, per inserire gli impianti in modo sicuro e preciso.",
      en: "A normal X-ray shows only two dimensions. A 3D CBCT scan lets us measure bone height and width and see nerves and sinuses, so implants can be placed safely and precisely.",
    },
  },
  {
    id: "treatments-2",
    topic: "treatments",
    question: {
      sq: "Çfarë ndodh nëse nuk kam mjaftueshëm kockë?",
      it: "Cosa succede se non ho abbastanza osso?",
      en: "What if I don't have enough bone?",
    },
    answer: {
      sq: "Në shumë raste kocka mund të rindërtohet me grefë kockore ose ngritje sinusi. Ndonjëherë zgjidhje si All-on-4, me implante të pjerrëta, shmangin nevojën për grefë. Pas skanimit 3D ju shpjegojmë mundësinë më të mirë.",
      it: "In molti casi l'osso può essere ricostruito con innesto osseo o rialzo del seno. A volte soluzioni come l'All-on-4, con impianti inclinati, evitano l'innesto. Dopo la TAC 3D ti spieghiamo l'opzione migliore.",
      en: "In many cases bone can be rebuilt with grafting or a sinus lift. Sometimes solutions such as All-on-4, with tilted implants, avoid the need for grafting. After the 3D scan we explain the best option.",
    },
  },
  {
    id: "tourism-1",
    topic: "tourism",
    question: {
      sq: "Sa ditë duhet të qëndroj për dhëmbët në një ditë?",
      it: "Quanti giorni devo restare per i denti in un giorno?",
      en: "How many days do I need to stay for same-day teeth?",
    },
    answer: {
      sq: "Varet nga rasti juaj. Zakonisht planifikojmë disa ditë për konsultën, ndërhyrjen dhe kontrollin e parë. Pas shqyrtimit të radiografisë ju tregojmë saktësisht sa ditë ju nevojiten.",
      it: "Dipende dal tuo caso. Di solito pianifichiamo alcuni giorni per visita, intervento e primo controllo. Dopo aver visto la radiografia ti diciamo esattamente quanti giorni servono.",
      en: "It depends on your case. We usually plan a few days for the consultation, surgery and first check-up. After reviewing your X-ray we tell you exactly how many days you need.",
    },
  },
  {
    id: "tourism-2",
    topic: "tourism",
    question: {
      sq: "Ku mund të qëndroj gjatë trajtimit?",
      it: "Dove posso alloggiare durante le cure?",
      en: "Where can I stay during treatment?",
    },
    answer: {
      sq: "Klinika ka apartamentet e veta të rezervuara për pacientët. Na tregoni datat tuaja dhe do t'ju konfirmojmë disponueshmërinë së bashku me planin e trajtimit.",
      it: "La clinica dispone di propri appartamenti riservati ai pazienti. Indicaci le tue date e ti confermeremo la disponibilità insieme al piano di cura.",
      en: "The clinic has its own apartments reserved for patients. Tell us your dates and we will confirm availability together with your treatment plan.",
    },
  },
  {
    id: "tourism-transport",
    topic: "tourism",
    question: {
      sq: "A më presin në aeroport?",
      it: "Qualcuno mi viene a prendere in aeroporto?",
      en: "Will someone pick me up at the airport?",
    },
    answer: {
      sq: "Po. Klinika ju pret në aeroportin e Tiranës dhe ju kthen atje në fund të trajtimit. Gjatë qëndrimit organizojmë edhe transportin kur keni nevojë të shkoni diku. Mjafton të na dërgoni të dhënat e fluturimit.",
      it: "Sì. La clinica ti viene a prendere all'aeroporto di Tirana e ti riaccompagna alla fine delle cure. Durante il soggiorno organizziamo anche il trasporto quando hai bisogno di spostarti. Basta inviarci i dati del volo.",
      en: "Yes. The clinic picks you up at Tirana airport and takes you back at the end of your treatment. During your stay we also arrange transport whenever you need to go somewhere. Just send us your flight details.",
    },
  },
  {
    id: "tourism-3",
    topic: "tourism",
    question: {
      sq: "Çfarë ndodh pasi kthehem në shtëpi?",
      it: "Cosa succede quando torno a casa?",
      en: "What happens after I return home?",
    },
    answer: {
      sq: "Ju japim udhëzime të qarta me shkrim dhe qëndrojmë në kontakt përmes WhatsApp. Kontrollet planifikohen që në fillim, përfshirë vizitën për dhëmbët përfundimtarë.",
      it: "Ti diamo istruzioni scritte chiare e restiamo in contatto via WhatsApp. I controlli sono pianificati fin dall'inizio, compresa la visita per i denti definitivi.",
      en: "We give you clear written instructions and stay in touch on WhatsApp. Check-ups are planned from the start, including the visit for your final teeth.",
    },
  },
  {
    id: "prices-1",
    topic: "prices",
    question: {
      sq: "Pse nuk i publikoni të gjitha çmimet?",
      it: "Perché non pubblicate tutti i prezzi?",
      en: "Why don't you publish all prices?",
    },
    answer: {
      sq: "Sepse çdo rast është i ndryshëm: numri i implanteve, nevoja për grefë dhe materialet ndryshojnë. Pas radiografisë ose skanimit 3D ju dërgojmë një preventiv të qartë me shkrim që përfshin çdo hap.",
      it: "Perché ogni caso è diverso: numero di impianti, necessità di innesti e materiali cambiano. Dopo la radiografia o la TAC 3D ti inviamo un preventivo scritto chiaro che include ogni fase.",
      en: "Because every case is different: the number of implants, the need for grafting and the materials vary. After your X-ray or 3D scan we send you a clear written quote that covers every step.",
    },
  },
  {
    id: "general-1",
    topic: "general",
    question: {
      sq: "A trajtoni edhe fëmijë?",
      it: "Curate anche i bambini?",
      en: "Do you also treat children?",
    },
    answer: {
      sq: "Po. Kujdesemi për pacientët më të vegjël me durim dhe butësi, që vizita te dentisti të jetë një përvojë e qetë.",
      it: "Sì. Ci prendiamo cura dei più piccoli con pazienza e delicatezza, perché la visita dal dentista sia un'esperienza serena.",
      en: "Yes. We care for our youngest patients with patience and gentleness, so that visiting the dentist is a calm experience.",
    },
  },
];

export const faqTopics: FaqTopic[] = ["same-day", "treatments", "tourism", "prices", "general"];

export function getFaqsByTopic(topic: FaqTopic) {
  return faqs.filter((f) => f.topic === topic);
}
