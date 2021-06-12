import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DTOsService {

  constructor() { }
}

export interface Dropdown {
  value: any,
  text: string,
  subValue?: Dropdown[],
}

export interface helpAlert {
  header: string,
  subHeader?: string,
  info: string,
}

export interface FormFields {
  placeholder?: string,
  labelPosition: "fixed" | "floating" | "stacked" | undefined,
  controlName: string,
  inputType?: string,
  type: "input" | "date" | "dropdown" | "textarea" | "subDropdown" | undefined,
  label: string,
  required: boolean,
  interfaceOptions?: any,
  interface?: string,
  data?: Dropdown[],
  validators: ValidatorFn[],
  defaultValue?: any,
  disabled?: boolean;
  parentControlName?: string,
  icon?:string,
  help?: boolean,
  helpInfo?: helpAlert,
  maxDateTime?: string,
  minDateTime?: string,
}

export interface Loan {
  loanType: "HL" | "CL" | "PL" | "EL" | "CCL" | undefined,
  balance: number,
  rate: number,
  tenure: number,
  emi: number,
}

export interface Assets {
  cash: number,
  equity: number,
  debt: number,
  realEstate: number,
  preciousMetals: number,
}
export interface Healthcheck {
  assets: Assets,
  loan: Loan[]
}

export interface UserProfile {
  userName: string,
  photoUrl: string,
  phone: string,
  skypeId: string,
  emailId: string,
}

export interface LoginDetails {
  loginType: number,
  password: string,
  userId: number
}

export interface QueryResponse {
  categoryId: number,
  expectedResolution?: string,
  queryDesc: string,
  queryType:number,
  subCategoryId:number,
  title:string,
  meetings?: Meeting[]
}

export interface Meeting {
  meetingDate:string,
  meetingTime:string,
  durationMin:string
}
// {\"queryId\":68,\"queryDesc\":\"general insurance\",\"queryType\":1,\"amount\":200,\"paid\":false,\
// \"paymentDate\":\"2018-03-30T07:06:41+00:00\",\"formattedDate\":\"30 Mar, 2018 07:03\",\"isFree\":null,
// \"paymentStatus\":\"FAILED\",\"queryTitle\":\"Query and Answers\"}
export interface Payment {
  queryId: number,
  queryDesc: string,
  queryType:number,
  amount: number,
  paid: boolean,
  paymentDate: string,
  isFree: any,
  paymentStatus: string,
  queryTitle: string,
}