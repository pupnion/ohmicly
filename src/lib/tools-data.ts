import {
  Shield,
  FileSpreadsheet,
  Zap,
  Palette,
  HardHat,
  ToggleLeft,
  Calculator,
  ClipboardCheck,
  FileText,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

export type Tool = {
  slug: string;
  title: string;
  title_en: string;
  desc: string;
  desc_long: string;
  standard: string;
  standard_badges: string[];
  type: string;
  category: "Calculator" | "Checklist" | "Template" | "Reference";
  downloads: number;
  icon: string;
  color: string;
  isFree: boolean;
  isPopular: boolean;
  howToUse: string[];
  audience: string[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
};

export const iconMap: Record<string, LucideIcon> = {
  Shield,
  FileSpreadsheet,
  Zap,
  Palette,
  HardHat,
  ToggleLeft,
  Calculator,
  ClipboardCheck,
  FileText,
  BookOpen,
};

export const colorMap: Record<
  string,
  { bg: string; text: string; badge: string }
> = {
  red: {
    bg: "bg-red-50",
    text: "text-brand-red",
    badge: "bg-red-50 text-red-700 border-red-200",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-brand-blue",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  yellow: {
    bg: "bg-yellow-50",
    text: "text-brand-gold",
    badge: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-brand-purple",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-brand-orange",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
  },
  green: {
    bg: "bg-green-50",
    text: "text-brand-green",
    badge: "bg-green-50 text-green-700 border-green-200",
  },
};

export const tools: Tool[] = [
  {
    slug: "rsc-checklist",
    title: "RSC Full Electrical Checklist",
    title_en: "RSC Electrical Audit Checklist",
    desc: "৪৭টি clause — বাংলায় ও ইংরেজিতে। BNBC 2020 reference সহ।",
    desc_long:
      "RMG ফ্যাক্টরির RSC (Remediation Sustainability Checklist) electrical audit-এর জন্য সম্পূর্ণ checklist। ৪৭টি clause বাংলা ও ইংরেজি দুই ভাষায়। প্রতিটি clause-এর সাথে BNBC 2020 page number ও section reference। সরাসরি auditor-কে দেখাতে পারবেন।",
    standard: "BNBC 2020 Sec 1.3.32 | RSC 2021",
    standard_badges: [
      "BNBC 2020 Part VIII Sec 1.3.32",
      "RSC Fire Manual 2021",
      "NIRAPON 2023",
    ],
    type: "PDF + Excel",
    category: "Checklist",
    downloads: 3240,
    icon: "Shield",
    color: "red",
    isFree: true,
    isPopular: true,
    howToUse: [
      "Excel file খুলুন — Main Checklist sheet-এ যান",
      "প্রতিটি clause পড়ুন এবং আপনার ফ্যাক্টরির সাথে match করুন",
      "Compliance column-এ PASS / FAIL / N/A select করুন",
      "Remarks column-এ প্রয়োজনীয় note লিখুন",
      "Summary sheet-এ auto calculation দেখুন — auditor-কে দেখান",
    ],
    audience: [
      "RMG Factory Electrical Manager",
      "RSC Audit প্রস্তুতি নিচ্চে Supervisor",
      "NIRAPON/ACCORD audit compliance team",
      "Factory Maintenance Engineer",
    ],
    faqs: [
      {
        q: "এই checklist-এ কতটি clause আছে?",
        a: "মোট ৪৭টি clause আছে — যা RSC Fire Manual 2021 অনুসরণ করে তৈরি।",
      },
      {
        q: "BNBC 2020 reference কি page number সহ?",
        a: "হ্যাঁ, প্রতিটি clause-এর সাথে BNBC 2020 Part VIII এর specific section ও page number দেওয়া আছে।",
      },
      {
        q: "PDF ও Excel দুটোই দরকার?",
        a: "Excel file-এ আপনি customize করতে পারবেন। PDF শুধু print করে ব্যবহারের জন্য।",
      },
      {
        q: "Auditor কি এই format accept করবে?",
        a: "হ্যাঁ, RSC ও NIRAPON auditorরা এই format সাধারণত accept করেন। BNBC reference সহ থাকায় credible।",
      },
      {
        q: "Update পাবো কি?",
        a: "নতুন version এলে এই page-ই update করা হবে। আবার download করে নিতে পারবেন।",
      },
    ],
    relatedSlugs: ["ir-test-report", "inspection-checklist", "safety-rules"],
  },
  {
    slug: "ir-test-report",
    title: "IR Test Report Template",
    title_en: "Insulation Resistance Test Report",
    desc: "৩০ সার্কিট, Auto Kt Correction, PASS/FAIL automatic।",
    desc_long:
      "Insulation Resistance (IR) test report template — ৩০টি circuit পর্যন্ত test করতে পারবেন। Temperature correction factor (Kt) automatic calculate হয়। PASS/FAIL判定 automatic — BS 7671 Table 64 অনুসরণ করে।",
    standard: "BNBC 2020 Sec 1.3.32 | BS 7671 Table 64",
    standard_badges: [
      "BNBC 2020 Part VIII Sec 1.3.32",
      "BS 7671:2018 Table 64",
      "IEC 60364-6",
    ],
    type: "Excel",
    category: "Template",
    downloads: 2891,
    icon: "FileSpreadsheet",
    color: "blue",
    isFree: true,
    isPopular: true,
    howToUse: [
      "Excel file খুলুন এবং Test Data sheet-এ যান",
      "Ambient temperature লিখুন — Kt correction auto calculate হবে",
      "প্রতিটি circuit-এর Phase-N, Phase-E, N-E readings লিখুন",
      "Corrected values ও PASS/FAIL automatic判定 দেখুন",
      "Print-ready report sheet থেকে print করুন",
    ],
    audience: [
      "Electrical Testing Engineer",
      "Commissioning Engineer",
      "RMG Factory Electrical Supervisor",
      "Building Electrical Inspector",
    ],
    faqs: [
      {
        q: "Kt correction কিভাবে কাজ করে?",
        a: "Ambient temperature লেখার সাথে সাথে BS 7671 Table 64 অনুযায়ী correction factor auto apply হয়।",
      },
      {
        q: "কত circuit পর্যন্ত পারবো?",
        a: "একটি sheet-এ ৩০টি circuit। প্রয়োজনে অন্য sheet copy করে আরও যোগ করতে পারবেন।",
      },
      {
        q: "PASS criteria কি?",
        a: "BS 7671 Table 64 অনুযায়ী — MΩ reading যদি minimum required value-র চেয়ে বেশি হয় PASS।",
      },
      {
        q: "Megger reading unit কি?",
        a: "MΩ (Mega Ohm) — 500V DC test voltage এর জন্য।",
      },
      {
        q: "Report format কেমন?",
        a: "Print-ready A4 format — project info, test readings, summary, signature block সব আছে।",
      },
    ],
    relatedSlugs: ["rsc-checklist", "earthing-calculator", "inspection-checklist"],
  },
  {
    slug: "lps-risk-index",
    title: "LPS Risk Index Calculator",
    title_en: "Lightning Protection Risk Index",
    desc: "Dropdown থেকে select করুন — Risk Index auto calculate।",
    desc_long:
      "Lightning Protection System (LPS) এর Risk Index calculator। BNBC 2020 Table 8.1.27 অনুসরণ করে তৈরি। Dropdown থেকে building type, location, environment select করুন — Risk Index automatic calculate হবে। LPS দরকার কিনা তাও জানাবে।",
    standard: "BNBC 2020 Sec 1.3.33 | Table 8.1.27",
    standard_badges: [
      "BNBC 2020 Part VIII Sec 1.3.33",
      "IEC 62305-2",
      "NFPA 780",
    ],
    type: "Excel",
    category: "Calculator",
    downloads: 2156,
    icon: "Zap",
    color: "yellow",
    isFree: true,
    isPopular: false,
    howToUse: [
      "Input sheet-এ building information দিন",
      "Dropdown থেকে location, environment, building type select করুন",
      "Risk Index automatic calculate হবে",
      "Result sheet-এ LPS দরকার কিনা দেখুন",
      "Report print করুন",
    ],
    audience: [
      "Electrical Design Engineer",
      "Building Architect",
      "Construction Project Manager",
      "Factory Electrical Manager",
    ],
    faqs: [
      {
        q: "Risk Index কি?",
        a: "Risk Index হলো lightning strike-এর সম্ভাবনা ও ক্ষতির মাত্রা — BNBC 2021 অনুযায়ী ১.০ এর বেশি হলে LPS দরকার।",
      },
      {
        q: "কোন কোন factor consider করে?",
        a: "Location, environment, building height, occupancy, content — সব BNBC Table 8.1.27 অনুসারে।",
      },
      {
        q: "LPS design করে দেয়?",
        a: "না, শুধু risk index calculate করে। LPS design IEC 62305 অনুসারে আলাদা করতে হবে।",
      },
      {
        q: "BNBC 2020 ছাড়া অন্য code use করা যায়?",
        a: "Calculator BNBC 2020 specific। IEC 62305-2 এর জন্য আলাদা calculator দরকার।",
      },
      {
        q: "Factory building-এ applicable?",
        a: "হ্যাঁ, RMG factory building-এ applicable — বিশেষত content flammability factor consider করে।",
      },
    ],
    relatedSlugs: ["rsc-checklist", "earthing-calculator", "cable-sizing"],
  },
  {
    slug: "wire-color-code",
    title: "Wire Color Code Chart",
    title_en: "Wire & Cable Colour Code Reference",
    desc: "IEC 60446, BS 7671, BNBC 2020 — পুরনো ও নতুন রঙ তুলনা।",
    desc_long:
      "ইলেকট্রিক্যাল wire ও cable-এর color code reference chart। IEC 60446, BS 7671:2018, BNBC 2020 — তিনটি standard একসাথে তুলনা করা আছে। পুরনো (pre-2004) এবং নতুন color code পাশাপাশি দেখতে পারবেন।",
    standard: "BNBC 2020 Sec 1.3.21 | Table 8.1.21",
    standard_badges: [
      "BNBC 2020 Part VIII Sec 1.3.21",
      "IEC 60446",
      "BS 7671:2018",
    ],
    type: "Excel",
    category: "Reference",
    downloads: 1987,
    icon: "Palette",
    color: "purple",
    isFree: true,
    isPopular: false,
    howToUse: [
      "Excel file খুলুন",
      "Single Phase বা Three Phase sheet-এ যান",
      "Conductor type দেখুন — পাশে color দেওয়া আছে",
      "পুরনো vs নতুন color comparison দেখুন",
      "Print করে কাজের জায়গায় রাখুন",
    ],
    audience: [
      "Electrician ও Wireman",
      "Electrical Supervisor",
      "Wiring Inspector",
      "Electrical Engineering Student",
    ],
    faqs: [
      {
        q: "নতুন color code কবে থেকে?",
        a: "বাংলাদেশে IEC 60446 অনুসরণ করা হয় — BNBC 2020 থেকে mandatory।",
      },
      {
        q: "পুরনো wiring-এ কোন color?",
        a: "Pre-2004: Phase=Red/Yellow/Blue, Neutral=Black। নতুন: Phase=Brown/Black/Grey, Neutral=Blue।",
      },
      {
        q: "Earth wire color কি?",
        a: "Green-Yellow (দুইটি standard একই) — সবসময় green-yellow striped।",
      },
      {
        q: "Control wiring-এ color code আলাদা?",
        a: "হ্যাঁ, control wiring-এ typically black/white use হয়। Standard vary করে।",
      },
      {
        q: "Cable color ও wire color একই?",
        a: "Outer sheath color আলাদা হতে পারে — inner conductor color follow করে।",
      },
    ],
    relatedSlugs: ["rsc-checklist", "cb-selection", "inspection-checklist"],
  },
  {
    slug: "arc-flash-ppe",
    title: "Arc Flash PPE Selector",
    title_en: "Arc Flash PPE Category Selector",
    desc: "Equipment type দিলে Category 1-4 ও সব PPE list auto।",
    desc_long:
      "NFPA 70E 2021 Table 130.7(C)(15) অনুসরণ করে Arc Flash PPE Category selector। Equipment type ও system voltage select করুন — PPE Category 1, 2, 3, বা 4 auto determine হবে এবং প্রয়োজনীয় সব PPE item list দেখাবে।",
    standard: "NFPA 70E 2021 Table 130.7(C)(15)",
    standard_badges: [
      "NFPA 70E 2021 Table 130.7(C)(15)",
      "OSHA 29 CFR 1910.269",
      "IEEE 1584",
    ],
    type: "Excel",
    category: "Calculator",
    downloads: 1654,
    icon: "HardHat",
    color: "orange",
    isFree: true,
    isPopular: false,
    howToUse: [
      "Equipment type select করুন (MCC, Switchgear, Panel etc.)",
      "System voltage ও available fault current দিন",
      "PPE Category auto determine হবে",
      "PPE list sheet-এ সব required PPE দেখুন",
      "Print করে safety board-এ টাঙান",
    ],
    audience: [
      "Electrical Safety Officer",
      "Maintenance Electrician",
      "Factory Safety Manager",
      "Power Plant Operator",
    ],
    faqs: [
      {
        q: "Arc Flash কি?",
        a: "Arc Flash হলো electrical fault-এর সময় যে explosive energy release হয় — মারাত্মক পোড়া হতে পারে।",
      },
      {
        q: "PPE Category ১-৪ মানে কি?",
        a: "Category 1 = কম risk (light PPE), Category 4 = সবচেয়ে বেশি risk (full arc-rated suit)।",
      },
      {
        q: "Incident Energy calculation আছে?",
        a: "এই tool-ে simplified category approach use করা হয়েছে। Detailed incident energy এর জন্য IEEE 1584 analysis দরকার।",
      },
      {
        q: "কত সময় interval-এ PPE category check করতে হবে?",
        a: "NFPA 70E অনুযায়ী প্রতি ৫ বছরে review করতে হবে, অথবা system change হলে।",
      },
      {
        q: "Label printing করা যায়?",
        a: "Excel-এ label template আছে — print করে equipment-এ লাগাতে পারবেন।",
      },
    ],
    relatedSlugs: ["safety-rules", "cb-selection", "rsc-checklist"],
  },
  {
    slug: "cb-selection",
    title: "CB Selection Guide",
    title_en: "Circuit Breaker Selection Guide",
    desc: "Current ও Isc দিলে MCB/MCCB/ACB type ও brand suggest।",
    desc_long:
      "Circuit Breaker selection guide — load current ও short circuit current (Isc) দিলে উপযুক্ত CB type (MCB, MCCB, ACB) suggest করে। Breaking capacity, trip curve, এবং brand comparison সহ।",
    standard: "BNBC 2020 Sec 1.3.13 | IEC 60898",
    standard_badges: [
      "BNBC 2020 Part VIII Sec 1.3.13",
      "IEC 60898",
      "IEC 60947-2",
    ],
    type: "Excel",
    category: "Calculator",
    downloads: 1432,
    icon: "ToggleLeft",
    color: "green",
    isFree: true,
    isPopular: false,
    howToUse: [
      "Load current (Amp) লিখুন",
      "Prospective short circuit current (kA) দিন",
      "Application type select করুন (Distribution, Motor, Lighting)",
      "Recommended CB type, rating, ও trip curve দেখুন",
      "Brand comparison chart দেখুন",
    ],
    audience: [
      "Electrical Design Engineer",
      "Panel Builder",
      "Procurement Engineer",
      "Factory Electrical Supervisor",
    ],
    faqs: [
      {
        q: "MCB, MCCB, ACB — পার্থক্য কি?",
        a: "MCB (Miniature) = low current, MCCB (Molded Case) = medium, ACB (Air Circuit Breaker) = high current application।",
      },
      {
        q: "Trip curve B, C, D — কোনটা কবে?",
        a: "B = resistive load, C = general purpose, D = motor/inrush current। Tool-এ auto suggest হয়।",
      },
      {
        q: "Breaking capacity কিভাবে choose করবো?",
        a: "Prospective Isc এর চেয়ে বেশি breaking capacity রাখতে হবে। Tool-এ auto suggest।",
      },
      {
        q: "কোন brand best?",
        a: "Schneider, ABB, Siemens, LS — সব ভালো। Tool-এ price-performance comparison আছে।",
      },
      {
        q: "Motor CB আলাদা কেন?",
        a: "Motor starting current (6-8x rated) handle করার জন্য D-curve বা motor protection CB দরকার।",
      },
    ],
    relatedSlugs: ["cable-sizing", "arc-flash-ppe", "transformer-sizing"],
  },
  {
    slug: "earthing-calculator",
    title: "Earthing Resistance Calculator",
    title_en: "Earthing System Resistance Calculator",
    desc: "Soil resistivity ও electrode type দিলে resistance auto।",
    desc_long:
      "Earthing system resistance calculator — soil resistivity, electrode type, ও dimensions দিলে earth resistance auto calculate করে। BNBC 2020 ও IEEE 80 standard follow করে।",
    standard: "BNBC 2020 Sec 1.3.34 | IEEE 80",
    standard_badges: [
      "BNBC 2020 Part VIII Sec 1.3.34",
      "IEEE 80",
      "IS 3043",
    ],
    type: "Excel",
    category: "Calculator",
    downloads: 1298,
    icon: "Calculator",
    color: "yellow",
    isFree: true,
    isPopular: false,
    howToUse: [
      "Soil resistivity (Ω-m) লিখুন",
      "Electrode type select করুন (Rod, Plate, Strip)",
      "Electrode dimensions দিন",
      "Earth resistance auto calculate হবে",
      "Required resistance < 1Ω check করুন",
    ],
    audience: [
      "Electrical Design Engineer",
      "Substation Engineer",
      "Lightning Protection Installer",
      "Factory Electrical Engineer",
    ],
    faqs: [
      {
        q: "Acceptable earthing resistance কত?",
        a: "BNBC 2020 অনুযায়ী ≤ 1Ω। কিছু application-এ 5Ω acceptable।",
      },
      {
        q: "Soil resistivity কিভাবে measure করবো?",
        a: "Wenner 4-point method use করে। Typical value: 10-1000 Ω-m।",
      },
      {
        q: "Multiple electrodes কি add করা যায়?",
        a: "হ্যাঁ, parallel electrodes — formula follow করে combined resistance calculate হয়।",
      },
      {
        q: "Chemical earthing কি better?",
        a: "Chemical earthing lower resistance দেয়। Calculator-এ compare করতে পারবেন।",
      },
      {
        q: "Seasonal variation consider করে?",
        a: "Dry season-এ resistance বাড়ে — safety factor 1.5 apply করা উচিত।",
      },
    ],
    relatedSlugs: ["lps-risk-index", "rsc-checklist", "cable-sizing"],
  },
  {
    slug: "cable-sizing",
    title: "Cable Sizing Calculator",
    title_en: "Power Cable Sizing Tool",
    desc: "Load current, voltage drop, derating — cable size auto suggest।",
    desc_long:
      "Power cable sizing calculator — load current, cable length, installation method, ambient temperature consider করে cable size auto suggest করে। Voltage drop check, derating factors, ও IEC 60364-5-52 compliance সহ।",
    standard: "BNBC 2020 Sec 1.3.21 | IEC 60364-5-52",
    standard_badges: [
      "BNBC 2020 Part VIII Sec 1.3.21",
      "IEC 60364-5-52",
      "BS 7671 Appendix 4",
    ],
    type: "Excel",
    category: "Calculator",
    downloads: 1187,
    icon: "Calculator",
    color: "blue",
    isFree: true,
    isPopular: false,
    howToUse: [
      "Load current (Amp) ও cable length (m) লিখুন",
      "Installation method select করুন (Tray, Conduit, Direct Buried)",
      "Ambient temperature ও grouping factor দিন",
      "Recommended cable size ও voltage drop % দেখুন",
      "Derating factors automatic apply হবে",
    ],
    audience: [
      "Electrical Design Engineer",
      "Contractor/Installer",
      "Project Engineer",
      "Maintenance Engineer",
    ],
    faqs: [
      {
        q: "Voltage drop limit কত?",
        a: "BNBC 2020 অনুযায়ী: Lighting = 3%, Power = 5%, Combined = 4%।",
      },
      {
        q: "Derating factors কি কি?",
        a: "Ambient temperature, grouping, installation method, soil thermal resistivity — সব consider হয়।",
      },
      {
        q: "Copper vs Aluminum?",
        a: "দুইটোই support করে। Copper 1.68x more conductive — তাই smaller size দরকার।",
      },
      {
        q: "Motor cable sizing আলাদা?",
        a: "Motor cable-এ starting current (6-8x) consider করতে হয়। Special factor apply হয়।",
      },
      {
        q: "Cable type (PVC/XLPE) select করা যায়?",
        a: "হ্যাঁ, PVC (70°C) ও XLPE (90°C) — temperature rating differ করে।",
      },
    ],
    relatedSlugs: ["cb-selection", "transformer-sizing", "load-estimation"],
  },
  {
    slug: "transformer-sizing",
    title: "Transformer Sizing Calculator",
    title_en: "Transformer Capacity Sizing",
    desc: "Connected load ও diversity factor দিলে transformer kVA suggest।",
    desc_long:
      "Transformer capacity sizing calculator — connected load, diversity factor, future expansion consider করে transformer kVA rating suggest করে। Oil type ও dry type comparison সহ।",
    standard: "BNBC 2020 | IEC 60076",
    standard_badges: ["BNBC 2020 Part VIII", "IEC 60076", "ANSI C57"],
    type: "Excel",
    category: "Calculator",
    downloads: 1054,
    icon: "Zap",
    color: "purple",
    isFree: true,
    isPopular: false,
    howToUse: [
      "Connected load (kW) লিখুন",
      "Diversity factor ও power factor দিন",
      "Future expansion % select করুন",
      "Recommended transformer kVA দেখুন",
      "Oil type vs Dry type comparison দেখুন",
    ],
    audience: [
      "Electrical Design Engineer",
      "Building Services Engineer",
      "Factory Electrical Manager",
      "Power Distribution Planner",
    ],
    faqs: [
      {
        q: "Diversity factor কি?",
        a: "সব load একসাথে চলে না — তাই actual demand connected load এর চেয়ে কম। Diversity factor = 0.6-0.8 typical।",
      },
      {
        q: "Over-sizing সমস্যা কি?",
        a: "হ্যাঁ, oversized transformer low efficiency দেয় no-load condition-এ। Right size best।",
      },
      {
        q: "Oil vs Dry type — কোনটা?",
        a: "Indoor = Dry type (fire safe), Outdoor = Oil type (cheaper, efficient). RMG factory-এ dry type recommended।",
      },
      {
        q: "Future expansion কত % রাখবো?",
        a: "সাধারণত 20-25% future expansion factor রাখা হয়।",
      },
      {
        q: "Standard kVA ratings কি কি?",
        a: "100, 150, 200, 315, 500, 750, 1000, 1500, 2000 kVA — nearest standard size select হয়।",
      },
    ],
    relatedSlugs: ["load-estimation", "cable-sizing", "cb-selection"],
  },
  {
    slug: "load-estimation",
    title: "Electrical Load Estimation Sheet",
    title_en: "Building Electrical Load Calculation",
    desc: "Floor-wise load, demand factor, diversity — total load auto।",
    desc_long:
      "Building electrical load estimation sheet — floor-wise connected load, demand factor, diversity factor consider করে total estimated load calculate করে। BNBC 2020 Part VIII Chapter 3 follow করে।",
    standard: "BNBC 2020 Part VIII Chapter 3",
    standard_badges: [
      "BNBC 2020 Part VIII Ch 3",
      "ASHRAE 90.1",
      "NEC Article 220",
    ],
    type: "Excel",
    category: "Template",
    downloads: 2034,
    icon: "FileSpreadsheet",
    color: "green",
    isFree: true,
    isPopular: false,
    howToUse: [
      "Floor list তৈরি করুন",
      "প্রতিটি floor-এ load type ও wattage লিখুন",
      "Demand factor select করুন",
      "Total estimated load auto calculate হবে",
      "Transformer ও generator sizing suggestion দেখুন",
    ],
    audience: [
      "Building Electrical Designer",
      "MEP Consultant",
      "Construction Project Manager",
      "Architect (preliminary estimation)",
    ],
    faqs: [
      {
        q: "Demand factor কি?",
        a: "Maximum demand / Connected load — BNBC 2020 এ প্রতিটি load type এর জন্য specific values আছে।",
      },
      {
        q: "RMG factory-এ applicable?",
        a: "হ্যাঁ, industrial load estimation আলাদা sheet আছে — motor, lighting, HVAC সব cover।",
      },
      {
        q: "Generator sizing suggestion?",
        a: "Estimated load-এর ভিত্তিতে generator kVA suggestion দেয়।",
      },
      {
        q: "HVAC load include করা যায়?",
        a: "হ্যাঁ, separate HVAC load entry option আছে।",
      },
      {
        q: "Single line diagram generate করে?",
        a: "না, শুধু load calculation। SLD আলাদা draw করতে হবে।",
      },
    ],
    relatedSlugs: ["transformer-sizing", "cable-sizing", "cb-selection"],
  },
  {
    slug: "inspection-checklist",
    title: "Electrical Inspection Checklist",
    title_en: "General Electrical Inspection Checklist",
    desc: "৬০টি clause — wiring, DB, earthing, lighting সব cover।",
    desc_long:
      "সাধারণ electrical inspection checklist — ৬০টি clause যা wiring, distribution board, earthing, lighting, cable tray সব cover করে। নতুন building বা renovation-এর পর inspection এর জন্য আদর্শ।",
    standard: "BNBC 2020 | BS 7671",
    standard_badges: [
      "BNBC 2020 Part VIII",
      "BS 7671:2018",
      "IEC 60364-6",
    ],
    type: "PDF + Excel",
    category: "Checklist",
    downloads: 1876,
    icon: "ClipboardCheck",
    color: "red",
    isFree: true,
    isPopular: false,
    howToUse: [
      "Excel file খুলুন — Category-wise sheets আছে",
      "প্রতিটি item check করুন",
      "PASS/FAIL/N/A select করুন",
      "Remarks ও photo reference যোগ করুন",
      "Summary report generate হবে",
    ],
    audience: [
      "Building Electrical Inspector",
      "MEP Engineer",
      "Construction Supervisor",
      "Electrical Contractor",
    ],
    faqs: [
      {
        q: "৬০টি clause কি কি cover করে?",
        a: "Wiring method, DB installation, earthing, lighting, cable tray, motor, generator — সব major category।",
      },
      {
        q: "BNBC approval-এ use করা যায়?",
        a: "হ্যাঁ, BNBC 2020 reference সহ থাকায় Rajuk/approval inspection-এ উপযোগী।",
      },
      {
        q: "Photo attach করা যায়?",
        a: "Excel-এ photo column আছে — link বা embed করতে পারবেন।",
      },
      {
        q: "Industrial inspection-এ applicable?",
        a: "এটা building-focused। ফ্যাক্টরির জন্য RSC Checklist ব্যবহার করুন।",
      },
      {
        q: "PDF version কেন?",
        a: "Print করে handwritten inspection করার জন্য — field এ নিয়ে যেতে পারবেন।",
      },
    ],
    relatedSlugs: ["rsc-checklist", "ir-test-report", "safety-rules"],
  },
  {
    slug: "safety-rules",
    title: "Electrical Safety Rules",
    title_en: "Electrical Safety Reference Guide",
    desc: "Lockout/Tagout, PPE, Arc Flash — বাংলায় safety guide।",
    desc_long:
      "ইলেকট্রিক্যাল safety rules reference guide — Lockout/Tagout (LOTO), PPE requirements, Arc Flash safety, working at height — সব বাংলায় সহজ ভাষায়। NFPA 70E ও OSHA standard follow করে।",
    standard: "NFPA 70E 2021 | OSHA",
    standard_badges: [
      "NFPA 70E 2021",
      "OSHA 29 CFR 1910.333",
      "IEC 62368",
    ],
    type: "PDF",
    category: "Reference",
    downloads: 987,
    icon: "BookOpen",
    color: "orange",
    isFree: true,
    isPopular: false,
    howToUse: [
      "PDF download করুন",
      "LOTO procedure section পড়ুন",
      "PPE requirements section-এ নিজের কাজের জন্য PPE list দেখুন",
      "Arc Flash safety rules মনে রাখুন",
      "Training এর জন্য team-এ share করুন",
    ],
    audience: [
      "Electrical Technician",
      "Safety Officer",
      "Factory Supervisor",
      "Electrical Training Instructor",
    ],
    faqs: [
      {
        q: "LOTO কি?",
        a: "Lockout/Tagout — machine বা circuit-এ কাজ করার আগে energy source isolate করার procedure।",
      },
      {
        q: "Arc Flash PPE কবে দরকার?",
        a: "50V এর বেশি live parts-এ কাজ করলে — NFPA 70E অনুযায়ী PPE দরকার।",
      },
      {
        q: "বাংলায় training material আছে?",
        a: "হ্যাঁ, পুরো guide বাংলায়। Training slides suggestion ও আছে।",
      },
      {
        q: "Electrical license exam-এ কাজে লাগবে?",
        a: "হ্যাঁ, safety section-এর জন্য এটা excellent preparation material।",
      },
      {
        q: "Emergency procedure আছে?",
        a: "হ্যাঁ, electrical shock response, CPR basics, emergency contact list — সব আছে।",
      },
    ],
    relatedSlugs: ["arc-flash-ppe", "rsc-checklist", "inspection-checklist"],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(tool: Tool): Tool[] {
  return tools.filter((t) => tool.relatedSlugs.includes(t.slug));
}
