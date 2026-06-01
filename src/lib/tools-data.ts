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
    desc: "47 clauses — in Bangla and English. With BNBC 2020 reference.",
    desc_long:
      "Complete checklist for RSC (Remediation Sustainability Checklist) electrical audit of RMG factories. 47 clauses in both Bangla and English. Each clause includes BNBC 2020 page number and section reference. Can be shown directly to the auditor.",
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
      "Open the Excel file — go to the Main Checklist sheet",
      "Read each clause and match it with your factory",
      "Select PASS / FAIL / N/A in the Compliance column",
      "Write necessary notes in the Remarks column",
      "View auto calculation in the Summary sheet — show it to the auditor",
    ],
    audience: [
      "RMG Factory Electrical Manager",
      "Supervisor preparing for RSC Audit",
      "NIRAPON/ACCORD audit compliance team",
      "Factory Maintenance Engineer",
    ],
    faqs: [
      {
        q: "How many clauses are in this checklist?",
        a: "There are 47 clauses in total — created following RSC Fire Manual 2021.",
      },
      {
        q: "Does the BNBC 2020 reference include page numbers?",
        a: "Yes, each clause includes the specific section and page number from BNBC 2020 Part VIII.",
      },
      {
        q: "Do I need both PDF and Excel?",
        a: "You can customize the Excel file. PDF is only for printing and field use.",
      },
      {
        q: "Will the auditor accept this format?",
        a: "Yes, RSC and NIRAPON auditors generally accept this format. It is credible because it includes BNBC references.",
      },
      {
        q: "Will I get updates?",
        a: "When a new version is available, this page will be updated. You can download it again.",
      },
    ],
    relatedSlugs: ["ir-test-report", "inspection-checklist", "safety-rules"],
  },
  {
    slug: "ir-test-report",
    title: "IR Test Report Template",
    title_en: "Insulation Resistance Test Report",
    desc: "30 circuits, Auto Kt Correction, automatic PASS/FAIL.",
    desc_long:
      "Insulation Resistance (IR) test report template — can test up to 30 circuits. Temperature correction factor (Kt) is calculated automatically. PASS/FAIL判定 is automatic — following BS 7671 Table 64.",
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
      "Open the Excel file and go to the Test Data sheet",
      "Enter the ambient temperature — Kt correction will be calculated automatically",
      "Enter Phase-N, Phase-E, N-E readings for each circuit",
      "View corrected values and automatic PASS/FAIL判定",
      "Print from the print-ready report sheet",
    ],
    audience: [
      "Electrical Testing Engineer",
      "Commissioning Engineer",
      "RMG Factory Electrical Supervisor",
      "Building Electrical Inspector",
    ],
    faqs: [
      {
        q: "How does Kt correction work?",
        a: "When you enter the ambient temperature, the correction factor is automatically applied according to BS 7671 Table 64.",
      },
      {
        q: "How many circuits can I test?",
        a: "30 circuits per sheet. You can copy another sheet to add more if needed.",
      },
      {
        q: "What is the PASS criteria?",
        a: "According to BS 7671 Table 64 — PASS if the MΩ reading is higher than the minimum required value.",
      },
      {
        q: "What is the Megger reading unit?",
        a: "MΩ (Mega Ohm) — for 500V DC test voltage.",
      },
      {
        q: "What is the report format?",
        a: "Print-ready A4 format — includes project info, test readings, summary, and signature block.",
      },
    ],
    relatedSlugs: ["rsc-checklist", "earthing-calculator", "inspection-checklist"],
  },
  {
    slug: "lps-risk-index",
    title: "LPS Risk Index Calculator",
    title_en: "Lightning Protection Risk Index",
    desc: "Select from dropdown — Risk Index is calculated automatically.",
    desc_long:
      "Risk Index calculator for Lightning Protection System (LPS). Created following BNBC 2020 Table 8.1.27. Select building type, location, environment from dropdown — Risk Index will be calculated automatically. It will also tell you whether LPS is needed.",
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
      "Enter building information in the Input sheet",
      "Select location, environment, building type from dropdown",
      "Risk Index will be calculated automatically",
      "Check if LPS is needed in the Result sheet",
      "Print the report",
    ],
    audience: [
      "Electrical Design Engineer",
      "Building Architect",
      "Construction Project Manager",
      "Factory Electrical Manager",
    ],
    faqs: [
      {
        q: "What is Risk Index?",
        a: "Risk Index is the probability of lightning strike and level of damage — according to BNBC 2021, LPS is needed if it exceeds 1.0.",
      },
      {
        q: "Which factors are considered?",
        a: "Location, environment, building height, occupancy, content — all according to BNBC Table 8.1.27.",
      },
      {
        q: "Does it design the LPS?",
        a: "No, it only calculates the risk index. LPS design must be done separately according to IEC 62305.",
      },
      {
        q: "Can I use other codes besides BNBC 2020?",
        a: "The calculator is specific to BNBC 2020. A separate calculator is needed for IEC 62305-2.",
      },
      {
        q: "Is it applicable for factory buildings?",
        a: "Yes, applicable for RMG factory buildings — especially considering the content flammability factor.",
      },
    ],
    relatedSlugs: ["rsc-checklist", "earthing-calculator", "cable-sizing"],
  },
  {
    slug: "wire-color-code",
    title: "Wire Color Code Chart",
    title_en: "Wire & Cable Colour Code Reference",
    desc: "IEC 60446, BS 7671, BNBC 2020 — old and new color comparison.",
    desc_long:
      "Color code reference chart for electrical wires and cables. Three standards — IEC 60446, BS 7671:2018, BNBC 2020 — are compared together. You can see old (pre-2004) and new color codes side by side.",
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
      "Open the Excel file",
      "Go to the Single Phase or Three Phase sheet",
      "Check the conductor type — color is shown next to it",
      "View old vs new color comparison",
      "Print and keep at the workplace",
    ],
    audience: [
      "Electrician and Wireman",
      "Electrical Supervisor",
      "Wiring Inspector",
      "Electrical Engineering Student",
    ],
    faqs: [
      {
        q: "When did the new color code start?",
        a: "IEC 60446 is followed in Bangladesh — mandatory from BNBC 2020.",
      },
      {
        q: "What color is used in old wiring?",
        a: "Pre-2004: Phase=Red/Yellow/Blue, Neutral=Black. New: Phase=Brown/Black/Grey, Neutral=Blue.",
      },
      {
        q: "What is the earth wire color?",
        a: "Green-Yellow (same in both standards) — always green-yellow striped.",
      },
      {
        q: "Is the color code different for control wiring?",
        a: "Yes, control wiring typically uses black/white. Standards vary.",
      },
      {
        q: "Are cable color and wire color the same?",
        a: "Outer sheath color can be different — inner conductor color follows the standard.",
      },
    ],
    relatedSlugs: ["rsc-checklist", "cb-selection", "inspection-checklist"],
  },
  {
    slug: "arc-flash-ppe",
    title: "Arc Flash PPE Selector",
    title_en: "Arc Flash PPE Category Selector",
    desc: "Enter equipment type — Category 1-4 and full PPE list auto.",
    desc_long:
      "Arc Flash PPE Category selector following NFPA 70E 2021 Table 130.7(C)(15). Select equipment type and system voltage — PPE Category 1, 2, 3, or 4 will be determined automatically and show all required PPE items.",
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
      "Select equipment type (MCC, Switchgear, Panel etc.)",
      "Enter system voltage and available fault current",
      "PPE Category will be determined automatically",
      "View all required PPE in the PPE list sheet",
      "Print and post on the safety board",
    ],
    audience: [
      "Electrical Safety Officer",
      "Maintenance Electrician",
      "Factory Safety Manager",
      "Power Plant Operator",
    ],
    faqs: [
      {
        q: "What is Arc Flash?",
        a: "Arc Flash is the explosive energy release during an electrical fault — can cause severe burns.",
      },
      {
        q: "What does PPE Category 1-4 mean?",
        a: "Category 1 = low risk (light PPE), Category 4 = highest risk (full arc-rated suit).",
      },
      {
        q: "Is there an Incident Energy calculation?",
        a: "This tool uses the simplified category approach. Detailed incident energy analysis requires IEEE 1584.",
      },
      {
        q: "How often should I check PPE category?",
        a: "According to NFPA 70E, review every 5 years, or when the system changes.",
      },
      {
        q: "Can I print labels?",
        a: "There is a label template in the Excel — you can print and attach it to equipment.",
      },
    ],
    relatedSlugs: ["safety-rules", "cb-selection", "rsc-checklist"],
  },
  {
    slug: "cb-selection",
    title: "CB Selection Guide",
    title_en: "Circuit Breaker Selection Guide",
    desc: "Enter current and Isc — get MCB/MCCB/ACB type and brand suggestion.",
    desc_long:
      "Circuit Breaker selection guide — enter load current and short circuit current (Isc) to get suitable CB type (MCB, MCCB, ACB) suggestion. Includes breaking capacity, trip curve, and brand comparison.",
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
      "Enter load current (Amp)",
      "Enter prospective short circuit current (kA)",
      "Select application type (Distribution, Motor, Lighting)",
      "View recommended CB type, rating, and trip curve",
      "View brand comparison chart",
    ],
    audience: [
      "Electrical Design Engineer",
      "Panel Builder",
      "Procurement Engineer",
      "Factory Electrical Supervisor",
    ],
    faqs: [
      {
        q: "What is the difference between MCB, MCCB, ACB?",
        a: "MCB (Miniature) = low current, MCCB (Molded Case) = medium, ACB (Air Circuit Breaker) = high current application.",
      },
      {
        q: "When to use Trip curve B, C, D?",
        a: "B = resistive load, C = general purpose, D = motor/inrush current. The tool auto suggests.",
      },
      {
        q: "How to choose breaking capacity?",
        a: "Must be higher than prospective Isc. The tool auto suggests.",
      },
      {
        q: "Which brand is best?",
        a: "Schneider, ABB, Siemens, LS — all are good. The tool includes price-performance comparison.",
      },
      {
        q: "Why is motor CB different?",
        a: "Motor starting current (6-8x rated) requires D-curve or motor protection CB.",
      },
    ],
    relatedSlugs: ["cable-sizing", "arc-flash-ppe", "transformer-sizing"],
  },
  {
    slug: "earthing-calculator",
    title: "Earthing Resistance Calculator",
    title_en: "Earthing System Resistance Calculator",
    desc: "Enter soil resistivity and electrode type — resistance is calculated automatically.",
    desc_long:
      "Earthing system resistance calculator — enter soil resistivity, electrode type, and dimensions to calculate earth resistance automatically. Follows BNBC 2020 and IEEE 80 standards.",
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
      "Enter soil resistivity (Ω-m)",
      "Select electrode type (Rod, Plate, Strip)",
      "Enter electrode dimensions",
      "Earth resistance will be calculated automatically",
      "Check that required resistance is < 1Ω",
    ],
    audience: [
      "Electrical Design Engineer",
      "Substation Engineer",
      "Lightning Protection Installer",
      "Factory Electrical Engineer",
    ],
    faqs: [
      {
        q: "What is acceptable earthing resistance?",
        a: "According to BNBC 2020: ≤ 1Ω. For some applications, 5Ω is acceptable.",
      },
      {
        q: "How to measure soil resistivity?",
        a: "Use the Wenner 4-point method. Typical value: 10-1000 Ω-m.",
      },
      {
        q: "Can I add multiple electrodes?",
        a: "Yes, parallel electrodes — combined resistance is calculated using the formula.",
      },
      {
        q: "Is chemical earthing better?",
        a: "Chemical earthing gives lower resistance. You can compare in the calculator.",
      },
      {
        q: "Does it consider seasonal variation?",
        a: "Resistance increases in dry season — a safety factor of 1.5 should be applied.",
      },
    ],
    relatedSlugs: ["lps-risk-index", "rsc-checklist", "cable-sizing"],
  },
  {
    slug: "cable-sizing",
    title: "Cable Sizing Calculator",
    title_en: "Power Cable Sizing Tool",
    desc: "Load current, voltage drop, derating — cable size auto suggested.",
    desc_long:
      "Power cable sizing calculator — considers load current, cable length, installation method, ambient temperature to auto suggest cable size. Includes voltage drop check, derating factors, and IEC 60364-5-52 compliance.",
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
      "Enter load current (Amp) and cable length (m)",
      "Select installation method (Tray, Conduit, Direct Buried)",
      "Enter ambient temperature and grouping factor",
      "View recommended cable size and voltage drop %",
      "Derating factors are applied automatically",
    ],
    audience: [
      "Electrical Design Engineer",
      "Contractor/Installer",
      "Project Engineer",
      "Maintenance Engineer",
    ],
    faqs: [
      {
        q: "What is the voltage drop limit?",
        a: "According to BNBC 2020: Lighting = 3%, Power = 5%, Combined = 4%.",
      },
      {
        q: "What are the derating factors?",
        a: "Ambient temperature, grouping, installation method, soil thermal resistivity — all are considered.",
      },
      {
        q: "Copper vs Aluminum?",
        a: "Both are supported. Copper is 1.68x more conductive — so smaller size is needed.",
      },
      {
        q: "Is motor cable sizing different?",
        a: "Motor cable must consider starting current (6-8x). A special factor is applied.",
      },
      {
        q: "Can I select cable type (PVC/XLPE)?",
        a: "Yes, PVC (70°C) and XLPE (90°C) — temperature rating differs.",
      },
    ],
    relatedSlugs: ["cb-selection", "transformer-sizing", "load-estimation"],
  },
  {
    slug: "transformer-sizing",
    title: "Transformer Sizing Calculator",
    title_en: "Transformer Capacity Sizing",
    desc: "Enter connected load and diversity factor — get transformer kVA suggestion.",
    desc_long:
      "Transformer capacity sizing calculator — considers connected load, diversity factor, future expansion to suggest transformer kVA rating. Includes oil type and dry type comparison.",
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
      "Enter connected load (kW)",
      "Enter diversity factor and power factor",
      "Select future expansion %",
      "View recommended transformer kVA",
      "View oil type vs dry type comparison",
    ],
    audience: [
      "Electrical Design Engineer",
      "Building Services Engineer",
      "Factory Electrical Manager",
      "Power Distribution Planner",
    ],
    faqs: [
      {
        q: "What is diversity factor?",
        a: "Not all loads run at the same time — so actual demand is less than connected load. Typical diversity factor = 0.6-0.8.",
      },
      {
        q: "What is the problem with over-sizing?",
        a: "Yes, oversized transformer gives low efficiency under no-load condition. Right size is best.",
      },
      {
        q: "Oil vs Dry type — which one?",
        a: "Indoor = Dry type (fire safe), Outdoor = Oil type (cheaper, efficient). Dry type is recommended for RMG factories.",
      },
      {
        q: "How much future expansion % should I keep?",
        a: "Generally 20-25% future expansion factor is kept.",
      },
      {
        q: "What are standard kVA ratings?",
        a: "100, 150, 200, 315, 500, 750, 1000, 1500, 2000 kVA — the nearest standard size is selected.",
      },
    ],
    relatedSlugs: ["load-estimation", "cable-sizing", "cb-selection"],
  },
  {
    slug: "load-estimation",
    title: "Electrical Load Estimation Sheet",
    title_en: "Building Electrical Load Calculation",
    desc: "Floor-wise load, demand factor, diversity — total load auto calculated.",
    desc_long:
      "Building electrical load estimation sheet — considers floor-wise connected load, demand factor, diversity factor to calculate total estimated load. Follows BNBC 2020 Part VIII Chapter 3.",
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
      "Create floor list",
      "Enter load type and wattage for each floor",
      "Select demand factor",
      "Total estimated load will be calculated automatically",
      "View transformer and generator sizing suggestion",
    ],
    audience: [
      "Building Electrical Designer",
      "MEP Consultant",
      "Construction Project Manager",
      "Architect (preliminary estimation)",
    ],
    faqs: [
      {
        q: "What is demand factor?",
        a: "Maximum demand / Connected load — BNBC 2020 has specific values for each load type.",
      },
      {
        q: "Is it applicable for RMG factories?",
        a: "Yes, there is a separate sheet for industrial load estimation — covers motor, lighting, HVAC.",
      },
      {
        q: "Is there a generator sizing suggestion?",
        a: "Yes, it gives generator kVA suggestion based on estimated load.",
      },
      {
        q: "Can I include HVAC load?",
        a: "Yes, there is a separate HVAC load entry option.",
      },
      {
        q: "Does it generate a single line diagram?",
        a: "No, only load calculation. SLD must be drawn separately.",
      },
    ],
    relatedSlugs: ["transformer-sizing", "cable-sizing", "cb-selection"],
  },
  {
    slug: "inspection-checklist",
    title: "Electrical Inspection Checklist",
    title_en: "General Electrical Inspection Checklist",
    desc: "60 clauses — covers wiring, DB, earthing, lighting and more.",
    desc_long:
      "General electrical inspection checklist — 60 clauses covering wiring, distribution board, earthing, lighting, cable tray and more. Ideal for inspection after new building construction or renovation.",
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
      "Open the Excel file — there are category-wise sheets",
      "Check each item",
      "Select PASS/FAIL/N/A",
      "Add remarks and photo reference",
      "Summary report will be generated",
    ],
    audience: [
      "Building Electrical Inspector",
      "MEP Engineer",
      "Construction Supervisor",
      "Electrical Contractor",
    ],
    faqs: [
      {
        q: "What do the 60 clauses cover?",
        a: "Wiring method, DB installation, earthing, lighting, cable tray, motor, generator — all major categories.",
      },
      {
        q: "Can it be used for BNBC approval?",
        a: "Yes, with BNBC 2020 reference included, it is suitable for Rajuk/approval inspection.",
      },
      {
        q: "Can I attach photos?",
        a: "There is a photo column in Excel — you can link or embed.",
      },
      {
        q: "Is it applicable for industrial inspection?",
        a: "This is building-focused. Use the RSC Checklist for factories.",
      },
      {
        q: "Why is there a PDF version?",
        a: "For printing and handwritten inspection — you can take it to the field.",
      },
    ],
    relatedSlugs: ["rsc-checklist", "ir-test-report", "safety-rules"],
  },
  {
    slug: "safety-rules",
    title: "Electrical Safety Rules",
    title_en: "Electrical Safety Reference Guide",
    desc: "Lockout/Tagout, PPE, Arc Flash — safety guide in simple language.",
    desc_long:
      "Electrical safety rules reference guide — Lockout/Tagout (LOTO), PPE requirements, Arc Flash safety, working at height — all in simple language. Follows NFPA 70E and OSHA standards.",
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
      "Download the PDF",
      "Read the LOTO procedure section",
      "Check the PPE list for your work in the PPE requirements section",
      "Remember Arc Flash safety rules",
      "Share with team for training",
    ],
    audience: [
      "Electrical Technician",
      "Safety Officer",
      "Factory Supervisor",
      "Electrical Training Instructor",
    ],
    faqs: [
      {
        q: "What is LOTO?",
        a: "Lockout/Tagout — the procedure to isolate energy source before working on a machine or circuit.",
      },
      {
        q: "When is Arc Flash PPE needed?",
        a: "When working on live parts above 50V — PPE is required according to NFPA 70E.",
      },
      {
        q: "Is there training material in Bangla?",
        a: "Yes, the entire guide is in Bangla. Training slide suggestions are also included.",
      },
      {
        q: "Will it help for the electrical license exam?",
        a: "Yes, it is excellent preparation material for the safety section.",
      },
      {
        q: "Are emergency procedures included?",
        a: "Yes, electrical shock response, CPR basics, emergency contact list — all included.",
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
