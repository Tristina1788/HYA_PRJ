import { Constant } from "../common/constant";

export class ApplyInfo {

  name: string;
  email: string;
  phoneNumber: string = Constant.phoneNumberDefault;
  coverLetter: string;
  linkId: string = Constant.linkIdDefault;
  cvPath: string = Constant.cvPathDefault;
  
  constructor (name: string, email: string){
     this.name = name;
     this.email = email;
  }
}
