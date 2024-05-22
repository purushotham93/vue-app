/* eslint-disable prettier/prettier */
interface Summary {
    total: number;
    confirmedCasesIndian: number;
    confirmedCasesForeign: number;
    discharged: number;
    deaths: number;
    confirmedButLocationUnidentified: number;
  }
  
  interface UnOfficialSummary {
    source: string;
    total: number;
    recovered: number;
    deaths: number;
    active: number;
  }
  
  interface Regional {
    loc: string;
    confirmedCasesIndian: number;
    confirmedCasesForeign: number;
    discharged: number;
    deaths: number;
    totalConfirmed: number;
  }
  
  interface LatestStats {
    summary: Summary;
    unofficial_summary: Array<UnOfficialSummary>;
    regional: Array<Regional>;
    lastRefreshed: Date;
    lastOriginUpdate: Date;
  }
  
  export { Summary, UnOfficialSummary, Regional, LatestStats };
  