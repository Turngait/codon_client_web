export interface IFood {
  id: string,
  title: string,
  calories?: number,
  callories?: number,
  harmfulness?: number,
  units?: string,
  groupId: string,
  descr: string,
  isIngredient?: boolean,
  ingredients?: any[],
  createdAt: string
}

export interface IIllness {
  id?: string,
  title: string,
  placeId: string,
  danger: number,
  descr: string
}


export interface IDiseaseData {
  id?: string,
  title: string,
  text: string
}
export interface IDisease {
  id: string,
  title: string,
  treatment: string,
  descr: string,
  description?: string;
  is_chronicle: boolean,
  symptoms: string[],
  danger: number,
  is_active: boolean,
  data: IDiseaseData[] | []
}

export interface IBodyPlaces {
  _id?: string,
  title: string
}

export interface IUserPersonalData {
  sex?: string,
  age: number,
  weight: number,
  height: number
}

export interface IUserData {
  name: string,
  email: string,
  status: string,
  isBanned: boolean,
  data: IUserPersonalData,
  settings: {
    lang: string,
    theme: string,
  },
  onboarding: {
    firstTime: boolean,
  },
  createdAt: string
}

export interface IFoodStat {
  id?: string,
  food_id: string,
  description: string,
  amount: number,
  time: string
}

export interface IIllnessStat {
  health_id?: string,
  power: number,
  begin: string,
  duration: string,
  description: string
}

export interface IStat {
  id?: string,
  date: string,
  foods: IFoodStat[] | [],
  health: [IIllnessStat] | IIllnessStat[] | []
}

export enum illsDangerEnum {
  none = 'Little',
  small = 'Small',
  medium = 'Middle',
  high = 'High',
  mortal = 'Average'
}