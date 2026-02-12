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

interface IClinicPhone {
  id: number;
  title: string;
  clinic_id: number;
  phone_number: string;
  is_main: number; 
}

interface IClinicAddresses {
  id: number;
  title: string;
  clinic_id?: number;
  address: string;
  is_main: boolean; 
}

export interface IClinic {
  id?: number;
  main: {
      title: string;
    law_info?: string;
    main_site?: string;
    description: string;
    phone?: string;
  },
  phones?: IClinicPhone[],
  addresses?: IClinicAddresses[],
}
