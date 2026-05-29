const standards = [
  {
    name: "BNBC 2020",
    full: "Bangladesh National Building Code",
    desc: "Part VIII Electrical",
  },
  {
    name: "NFPA 70E 2021",
    full: "Electrical Safety in Workplace",
    desc: "Arc Flash + PPE",
  },
  {
    name: "RSC Fire Manual 2021",
    full: "RMG Buildings",
    desc: "Fire Safety",
  },
  {
    name: "BS 7671:2018",
    full: "IEE Wiring Regulations",
    desc: "18th Edition",
  },
  {
    name: "IEC 60364",
    full: "Low Voltage Installations",
    desc: "International",
  },
  {
    name: "IEEE Std 43-2013",
    full: "IR Testing for Motors",
    desc: "Motor Insulation",
  },
  {
    name: "IEC 62305",
    full: "Lightning Protection",
    desc: "LPS Design",
  },
  {
    name: "NFPA 780",
    full: "Lightning Protection Installation",
    desc: "LPS Standard",
  },
];

export default function StandardsSection() {
  return (
    <section className="py-20 bg-brand-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-bn">
            আমরা যে Standards Follow করি
          </h2>
          <p className="mt-3 text-white/60 font-bn text-lg">
            প্রতিটি tool-এ page number সহ reference
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {standards.map((std, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-white font-bold font-en text-sm">{std.name}</h3>
              <p className="text-white/80 text-xs mt-1 font-en">{std.full}</p>
              <p className="text-white/40 text-xs mt-2 font-en">{std.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
