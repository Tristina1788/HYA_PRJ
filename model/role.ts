import { Constant } from "../common/constant";

export class RoleInfo {

  name: string;
  location: string = Constant.locationDefault;
  dateTime: string;
  amountFrom: string = Constant.amountFromDefault;
  amountTo: string = Constant.amountToDefault;
  
  constructor (name: string, dateTime : string){
     this.name = name;
     this.dateTime = dateTime;
  }}
