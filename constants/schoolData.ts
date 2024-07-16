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
      1: [],
      2: [],
      3: [],
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
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }},
    { name: "Industriell ekonomi, 300 hp", years: { 
      1: [],
      2: [],
      3: [],
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
      1: [],
      2: [],
      3: [],
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
      1: ["MVE675", "MVE545", "LEU470", "EDA387", "TDA452", "DAT610", "LEU432", "TDA352", "LEU483", "LSP581", "DAT341", "DAT565", "TDA384", "LET627", "TDA567", "TDA596", "EDA234", "MVE535", "DAT390", "TDA357", "EDA093", "DAT151", "EDA264", "CLS050", "TMV211","DAT055", "DAT050", "LEU237", "SSY326", "EDA387", "TDA452", "DAT610", "LMA521", "DAT257", "TDA352", "FFR102", "DAT565", "TDA384", "TDA567", "LMA201", "TDA596", "EDA234", "EDA322", "DAT390", "DAT356", "LEU062", "LMU450", "TDA357", "DAT326", "EDA093", "DAT151", "EDA264", "TMV211", "DAT495","DAT050", "EDA387", "LMTX38", "TDA452", "DAT610", "LSP127", "DAT068", "LMA521", "DAT076", "DAT257", "TDA352", "TEK486", "DAT341", "DAT565", "TDA384", "TDA567", "SSY011", "LMA201", "TDA596", "EDA234", "EDA322", "DAT356", "EENX20", "LEU062", "LMU450", "TDA357", "DAT326", "EDA093", "DAT151", "EDA264", "LMA017", "DAT495"],
      2: [],
      3: []
    }},
    { name: "Design och produktutveckling, 180 hp", years: { 
      1: [],
      2: [],
      3: [] 
    }},
    { name: "Ekonomi och produktionsteknik, 180 hp", years: { 
      1: [],
      2: [],
      3: []
    }},
    { name: "Elektroteknik, 180 hp", years: { 
      1: ["MVE675", "MVE545", "LEU470", "ENM061", "ENM097", "LEU432", "LEU483", "LSP581", "TME095", "EDA234", "MVE535", "DAT390", "LET086", "MTT060", "ENM056", "ENM052", "MTT035", "SSY305", "CLS050","SSY326", "ENM061", "ENM097", "SEE035", "FFR102", "TME095", "LMA201", "EDA234", "LEU236", "EDA322", "DAT390", "ENM056", "LET271", "EEK565", "LEU062", "ENM052", "RRY011", "LMU450", "SSY020", "LMTX38", "ENM061", "ENM097", "LSP127", "DAT068", "EEN225", "EEN095", "SSY251", "SSY011", "TME095", "LMA201", "EDA234", "EDA322", "MCCX05", "MTT060", "ENM056", "EENX20", "LEU340", "LEU062", "ENM052", "LMU450", "MTT035", "SEEX20", "LET564", "SSY305", "LMA017"],
      2: [],
      3: []
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
      1: [],
      2: [],
      3: [],
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
