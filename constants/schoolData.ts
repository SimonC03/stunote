type Course = {
  name: string;
  years: {
    [year: number]: string[];
  };
};

type SchoolData = {
  [key: string]: Course[];
};

export const schoolData: SchoolData = {
  "Blekinge Tekniska Högskola (BTH)": [
    { name: "Civilingenjör i AI och maskininlärning, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    }},
    { name: "Civilingenjör i datorsäkerhet, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Civilingenjör i industriell ekonomi och management, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Civilingenjör i marin teknik, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Civilingenjör i maskinteknik - produktutveckling, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Civilingenjör i mjukvaruutveckling, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Civilingenjör i spelteknik, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Fysisk planering, 180 hp", years: { 
      1: [],
      2: [],
      3: []
    }},
    { name: "Högskoleingenjör i IT-säkerhet, 180 hp", years: { 
      1: [],
      2: [],
      3: []  
    }},
    { name: "Högskoleingenjör i maskinteknik, 180 hp", years: { 
      1: [],
      2: [],
      3: []  
    }},
    { name: "Högskoleingenjör i teknisk spelgrafik, 180 hp", years: { 
      1: [],
      2: [],
      3: []  
    }},
    { name: "Sjuksköterskeprogrammet, 180 hp", years: { 
      1: [],
      2: [],
      3: []  
    }},
    { name: "Software Engineering, 180 hp", years: { 
      1: [],
      2: [],
      3: []  
    }},
    { name: "Webbprogrammering, 180 hp", years: { 
      1: [],
      2: [],
      3: []  
    }},
  ],

  "Chalmers Tekniska Högskola": [
    { name: "Arkitektur", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    }},
    { name: "Arkitektur och teknik", years: { 
      1:["DAT425", "MVE605", "SSY331", "SEE055", "TMV139", "DAT430", "MVE610", "SEE100", "MMS135", "MVE615", "DAT525", "EEN150", "MMS215", "MVE091", "EEN155", "IMS085", "SSY043", "MTF042", "LMU450", "SSY052", "EEN175", "EEN220", "EEN175", "CLS045", "DAT610", "EDA322", "EDA344", "ETI147",],
      2: [],
      3: [],
      4: [],
      5: [],
    }},
    { name: "Tekniskt basår", years: { 
      1: ["MVE426", "SEE180", "MVE285", "IMS145", "KBT185", "TIF410", "LET924", "MVE725", "TIF410"]
    }},
    { name: "Automation och mekatronik, 300 hp", years: { 
      1: ["DAT425", "MVE605", "SSY331", "SEE055", "SSY331", "TMV139", "DAT430", "MVE610", "SEE100", "DAT430", "MMS135", "MVE615"],
      2: ["DAT525", "EEN150", "MMS215", "EEN150", "MVE091", "SEE100", "EEN155", "IMS085", "SSY043", "MTF042", "IMS085", "LMU450", "SSY052"],
      3: ["EEN175", "EEN220", "IMS080", "MTF053", "MVE295", "TDA384", "TMA947", "TMS150", "TMV200", "EEN175", "EEN220", "DAT516", "EEM015", "MHA021", "MMF092", "MTT031", "MVE550", "SEE020", "SJO955", "TDA452", "TDA567", "TEK741", "CLS045", "DAT610", "EDA322", "EDA344", "ETI147", "MTF155", "PPU061", "PPU201", "SSY305", "TDA357", "TEK125", "TMV029",],
      4: [],
      5: []
    }},
    { name: "Bioteknik, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }},
    { name: "Datateknik, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }},
    { name: "Elektroteknik, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }},
    { name: "Globala system, 300 hp", years: { 
      1: ["MVE620", "MVE626", "SEE070", "SEE075", "SEE086", "DAT435", "SEE070", "SEE081", "SEE060", "SEE065",],
      2: ["DAT506", "DAT605", "SEE110", "MVE655", "TEL820", "MVE650", "SEE105", "DAT565", "TEK915",],
      3: ["TEK761", "ACE235", "MTF053", "MVE295", "SSY051", "TIF395", "TMA947", "MVE680", "BOM345", "DAT038", "SEE020", "SEE055", "SEE155", "BOM360", "DAT341", "EEM155", "IEK415", "TMA982", "SEE150",],
      4: [],
      5: []
    }},
    { name: "Industriell ekonomi, 300 hp", years: { 
      1: ["MVE014", "TEK927", "TEK935", "MVE019", "TEK935", "TEK946", "MVE023", "TEK930", "TEK940", "MVE660", "TEK940", "TEK950"],
      2: ["DAT555", "TMS137", "DAT516", "IMA044", "DAT565", "ITR234", "TEK615", "TIF233",],
      3: ["IOE012", "TEK825", "MVE690",],
      4: [],
      5: []
    }},
    { name: "Informationsteknik, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }},
    { name: "Kemiteknik med fysik, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }},
    { name: "Kemiteknik, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }},
    { name: "Maskinteknik, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }},
    { name: "Medicinteknik, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }},
    { name: "Samhällsbyggnadsteknik, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }},
    { name: "Teknisk design, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }},
    { name: "Teknisk fysik, 300 hp", years: { 
      1: ["MVE670", "TIF276", "TMA970", "FFM516", "SEE125", "TMA976", "FFM516", "MVE035", "SEE125", "TIF276", "SEE125", "TIF375", "TMA321",],
      2: ["ESS117", "MVE025", "TIF083", "EEN190", "ERE091", "TIF083", "TIF385", "EEN190", "MVE030", "TIF083", "FFY091", "MMS260", "TIF083",],
      3: ["FTF141", "TIF395", "TIF097", "TIF400", "DAT038", "DAT516", "EDA452", "EEK141", "EEM021", "ITS067", "KBT340", "MHA021", "MVE695", "SEE020", "SJO955", "TEK685", "TEK720", "TIF390", "MVE370", "FUF050", "TIF097", "MVE370", "TIF076", "TIF097", "MVE370",],
      4: [],
      5: []
    }},
    { name: "Teknisk matematik, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }},
    { name: "Datateknik, 180 hp", years: { 
      1: ["CLS050", "LEU432", "LEU470", "MVE675", "LEU483", "DAT390", "MVE535", "LET627", "LSP581", "MVE545",],
      2: ["DAT050", "TMV211", "LEU237", "TDA357", "DAT055", "LEU062", "SSY326", "DAT495", "FFR102", "SSY326",],
      3: ["DAT257", "EDA093", "EDA093", "EDA387", "LMA017", "SSY011", "TDA384", "DAT068", "DAT151", "DAT356", "EDA234", "LMA521", "TDA352", "TDA452", "TDA567", "TDA596", "TEK486", "LSP127", "DAT076", "DAT326", "DAT610", "EDA264", "EDA322", "LMA201", "TDA384", "LMU450",]
    }},
    { name: "Design och produktutveckling, 180 hp", years: { 
      1: [],
      2: [],
      3: [] 
    }},
    { name: "Ekonomi och produktionsteknik, 180 hp", years: { 
      1: ["MVE575", "TEK345", "MVE570", "TEK685", "LMT202", "TEK336", "EEN065", "TEK375",],
      2: ["IMS070", "TEK341", "LMA521", "LMT991", "MMS270", "TEK380", "TEK371", "TEK400",],
      3: ["TEK630", "DAT565", "LMA017", "LMU056", "PPU032", "SSY295", "PPU055", "DAT516", "LMU113", "SJO955", "TEK600", "TEK700", "TEK691", "TEK391",]
    }},
    { name: "Elektroteknik, 180 hp", years: { 
      1: ["MVE675", "MVE545", "LEU470", "LEU432", "LEU483", "LSP581", "TME095", "EDA234", "MVE535", "DAT390", "LET086"],
      2: ["SEE035", "SSY020", "LEU236", "RRY011", "LET271", "LMA201", "SSY326", "EEK565", "FFR201"],
      3: ["LSP127", "LMU450", "SSY011", "EEN095", "LMA017", "DAT068", "ENM061", "LET564", "SSY251", "EDA322", "EEN225", "LEU062", "LEU340", "LMU450",]
    }},
    { name: "Maskinteknik, 180 hp", years: { 
      1: ["LMA401", "LMU421", "PPU127", "MVE580", "LMT202", "MMS275", "MVE645", "TME255",],
      2: ["IMS100", "SSY295", "IMS026", "TEK720", "LMA522", "PPU201", "LMS893", "PPU196",],
      3: [ "MMS050", "MMS050", "LMA224", "PPU201", "IMS045", "LMU305", "LMA522", "IMSX20", "SEE020", "MTT126", "MMS050", "LMS586", "TEK720", "LMU102", "LMT108", "SSY295", "MTF115", "MTF053", "LMT211", "IMS020", "MMF092", "MMSX25", "LMA224", "TEKX01", "LMA017", "LMU056", "IMS095"]
    }},
    { name: "Mekatronik, 180 hp", years: { 
      1: ["EEN030","LMA401", "LEU432",  "MVE580", "LEU471", "TME221", "LEU076", "LEU481", ],
      2: ["LMT212", "SSY020", "LEU236", "MMS125", "DAT390", "EEN105", "SSY326","EEN090", "IMS060",],
      3: ["IMS080", "DAT050", "EEN095", "LMA017", "LMU056", "SSY011", "LMU433", "SSY251", "EDA322", "LEU340", "LMA224", "LMA522", "LMT834", "TEK725"],
     }},
    { name: "Samhällsbyggnadsteknik, 180 hp", years: { 
      1: [],
      2: [],
      3: []
    }},
  ],

  "Högskolan Dalarna": [
    { name: "Byggteknik och design 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Byggingenjörsprogram 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Data Science: Masterprogram 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Energi - Högskoleingenjörsprogram 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "IT säkerhet och mjukvarutestning 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Maskinteknik 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Materialdesign 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Medicinsk teknik 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Medicinsk teknik 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Samhällsbyggnad 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Teknisk bastermin 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Tekniskt basår 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
  ],

  "Högskolan i Borås": [
    { name: "Affärsutvecklarprogrammet Bygg och Fastighet, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Byggingenjör, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Energiingenjör, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Industriell ekonomi - affärsingenjör, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Industriell ekonomi - arbetsorganisation och ledarskap, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Industriell ekonomi - logistikingenjör, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "IT-ingenjör - digital infrastruktur och cybersäkerhet, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Kemiingenjör - tillämpad bioteknik, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Maskiningenjör - Automation och AI, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Textilingenjörsutbildning, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
  ],

  "Högskolan i Halmstad": [
    { name: "Byggingenjör, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Civilingenjör i datateknik, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Civilingenjör i intelligenta system, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Civilingenjör i maskinteknik, hållbar design och innovation, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Dataingenjör, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Elektroingenjör, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Ingenjör i hållbar energi, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "IT-forensik och informationssäkerhet, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Mekatronikingenjör, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Tillämpad artificiell intelligens (AI), 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
    { name: "Utvecklingsingenjörsprogrammet, 180 hp", years: { 
      1: [],
      2: [],
      3: [], 
    }},
  ],

  "Kungliga Tekniska högskolan (KTH)": [
    { name: "Arkitektutbildning 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Bioteknik 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Byggteknik och design 180 hp", years: { 
      1: [] 
    }},
    { name: "Civilingenjör och lärare 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Datateknik 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Datateknik, Flemingsberg 180 hp", years: { 
      1: [] 
    }},
    { name: "Datateknik, Kista 180 hp", years: { 
      1: [] 
    }},
    { name: "Design och produktframtagning 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Elektronik och datorteknik 180 hp", years: { 
      1: [] 
    }},
    { name: "Elektroteknik 180 hp", years: { 
      1: [] 
    }},
    { name: "Elektroteknik 300 hp", years: { 
      1: ["SF1625", "DD1310", "El1110", "IE1205", "SF1624", "SF1626", "EP1200"],
      2: ["ED1110", "El1220", "EQ1110", "EQ1120", "SF1920", "SK1108", "DD1320"],
      3: ["EJ1200", "EK1191", "EL1020", "EQ1270", "IE1207"],
      4: [],
      5: [], 
    }},
    { name: "Energi och miljö 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Farkostteknik 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Fastighet och finans 180 hp", years: { 
      1: [] 
    }},
    { name: "Fastighetsutveckling med fastighetsförmedling 180 hp", years: { 
      1: [] 
    }},
    { name: "Industriell ekonomi 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Industriell teknik 180 hp", years: { 
      1: [] 
    }},
    { name: "Industriell teknik och hållbarhet 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Informations- och kommunikationsteknik 180 hp", years: { 
      1: [] 
    }},
    { name: "Informationsteknik 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Kemiteknik 180 hp", years: { 
      1: [] 
    }},
    { name: "Maskinteknik 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Materialdesign 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Medicinsk teknik 180 hp", years: { 
      1: [] 
    }},
    { name: "Medicinsk teknik 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Medieteknik 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Samhällsbyggnad 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Teknik och ekonomi 180 hp", years: { 
      1: [] 
    }},
    { name: "Teknisk fysik 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Teknisk kemi 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
    { name: "Teknisk matematik 300 hp", years: { 
      1: [],
      2: [],
      3: [],
      4: [],
      5: [], 
    }},
  ],

  "Linnéuniversitetet": [
    { name: "Byggnadsutformning, 180 hp", years: { 
      1: [] 
    }},
    { name: "Byggteknik, 180 hp", years: { 
      1: [] 
    }},
    { name: "Civilingenjör i mjukvaruteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Civilingenjör i teknisk matematik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Datateknik, 180 hp", years: { 
      1: [] 
    }},
    { name: "Driftteknikerprogrammet, 120 hp", years: { 
      1: [] 
    }},
    { name: "Drift- och underhållsteknik, 180 hp", years: { 
      1: [] 
    }},
    { name: "Elektroteknik, 180 hp", years: { 
      1: [] 
    }},
    { name: "Energi och miljö, 180 hp", years: { 
      1: [] 
    }},
    { name: "Fysikerprogrammet, 180 hp", years: { 
      1: [] 
    }},
    { name: "Industriell ekonomi, 180 hp", years: { 
      1: [] 
    }},
    { name: "Maskinteknik, inriktning produktutveckling, 180 hp", years: { 
      1: [] 
    }},
    { name: "Matematikerprogrammet, 180 hp", years: { 
      1: [] 
    }},
    { name: "Mjukvaruteknik, 180 hp", years: { 
      1: [] 
    }},
    { name: "Sjöingenjör, 180 hp", years: { 
      1: [] 
    }},
    { name: "Skogskandidatprogrammet, 180 hp", years: { 
      1: [] 
    }},
  ],

  "Luleå tekniska universitet": [
    { name: "Hållbar energiteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Industriell ekonomi, 300 hp", years: { 
      1: [] 
    }},
    { name: "Hållbar process- och kemiteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Teknisk design, 300 hp", years: { 
      1: [] 
    }},
    { name: "Teknisk fysik och elektroteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Väg- och vattenbyggnad, 300 hp", years: { 
      1: [] 
    }},
    { name: "Maskinteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Materialteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Arkitektur, 300 hp", years: { 
      1: [] 
    }},
    { name: "Datateknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Rymdteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Öppen ingång, 300 hp", years: { 
      1: [] 
    }},
    { name: "Tillämpad artificiell intelligens, 300 hp", years: { 
      1: [] 
    }},
    { name: "Naturresursteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Maskinteknik, 180 hp", years: { 
      1: [] 
    }},
    { name: "Underhållsteknik, 180 hp", years: { 
      1: [] 
    }},
    { name: "Bergteknik, 180 hp", years: { 
      1: [] 
    }},
    { name: "Bilsystemteknik, 180 hp", years: { 
      1: [] 
    }},
    { name: "Energiteknik, 180 hp", years: { 
      1: [] 
    }},
    { name: "Elkraftteknik, 180 hp", years: { 
      1: [] 
    }},
    { name: "Datateknik, 180 hp", years: { 
      1: [] 
    }},
  ],

  "Lunds universitet": [
    { name: "Bioteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Ekosystemteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Industriell ekonomi, 300 hp", years: { 
      1: [] 
    }},
    { name: "Maskinteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Maskinteknik - teknisk design, 300 hp", years: { 
      1: [] 
    }},
    { name: "Medicin och teknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Risk, säkerhet och krishantering", years: { 
      1: [] 
    }},
    { name: "Teknisk fysik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Teknisk nanovetenskap, 300 hp", years: { 
      1: [] 
    }},
    { name: "Elektroteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Informations- och kommunikationsteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Kemiteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Lantmäteriteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Maskinteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Teknisk fysik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Teknisk matematik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Datateknik, 180 hp", years: { 
      1: [] 
    }},
    { name: "Logistics service management, 180 hp", years: { 
      1: [] 
    }},
  ],

  "Mittuniversitetet": [
    { name: "Additiv tillverkning - högskoleingenjör maskinteknik, 180 hp", years: { 
      1: [] 
    }},
    { name: "Automationsingenjör, 180 hp", years: { 
      1: [] 
    }},
    { name: "Byggingenjör Hållbart byggande, 180 hp", years: { 
      1: [] 
    }},
    { name: "Civilingenjör i datateknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Civilingenjör i elektroteknik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Civilingenjör i industriell ekonomi, 300 hp", years: { 
      1: [] 
    }},
    { name: "Civilingenjör i teknisk design, 300 hp", years: { 
      1: [] 
    }},
    { name: "Civilingenjör i teknisk fysik, 300 hp", years: { 
      1: [] 
    }},
    { name: "Civilingenjör i teknisk kemi, 300 hp", years: { 
      1: [] 
    }},
    { name: "Civilingenjörsutbildning i teknisk kemi Mittuniversitetet-KTH, 300 hp", years: { 
      1: [] 
    }},
    { name: "Ekoingenjör, 180 hp", years: { 
      1: [] 
    }},
    { name: "Sportteknologi - högskoleingenjör produktutveckling, 180 hp", years: { 
      1: [] 
    }},
  ],

  "Other School": [
    { name: "Other", years: { 
      1: [] 
    }},
  ],
};
