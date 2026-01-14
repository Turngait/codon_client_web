export interface IValue {
  id?: number;
  title : string,
  volume: string;
  normal: string;
  description: string;
}

export interface IAnalyses {
  id: number;
  date: string;
  title: string;
  group_id: number;
  doctors: string;
  clinic_id: number;
  equipment: string;
  description: string;
  values: IValue[]
}

export interface IClinic {
  id?: number;
  title: string;
  law_info?: string;
  main_site?: string;
  description: string;
  phone?: string;
}