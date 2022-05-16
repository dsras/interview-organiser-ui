import { Injectable } from '@angular/core';
import { Requester } from '../requester/requester.service';
import { userData, Skills, SkillOptions } from '../../shared/models/types';
import { APPCONSTANTS } from '../../shared/constants/app.constant';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class RequestCenterService {
  constructor(private requester: Requester, private pipe: DatePipe) {}

  getUser(username: string): void {
    console.log('Calling')
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.USER_FIND +
      '?username=' +
      username;
    this.requester.getRequest<userData>(url).subscribe((returnData) => {
      return returnData;
    });
  }

  getUserData(username: string) {
    let user: userData;
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.USER_FIND +
      '?username=' +
      username;
    this.requester.getRequest<userData>(url).subscribe((returnData: any) => {
      user = returnData
      localStorage.setItem('userData', JSON.stringify(user))
    })  
    
  }

  getUsername(): string {
    let username: string = '';
    let inString = <string>localStorage.getItem('ssoUser');

    if (inString != '' && inString != null) {
      let myObj = JSON.parse(inString);
      username = myObj.email;
    } else {
      console.warn('No username was available');
    }
    return username;
  }
  // ! not tested
  getSkills(username: string): Array<Skills> {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.SKILLS_GET +
      '?username=' +
      username;
    let out;
    this.requester.getRequest<Skills>(url).subscribe((returnData) => {
      out = returnData;
    });
    out = <Array<Skills>>(<unknown>out);
    return out;
  }

  addSkills(id: number, username: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.SKILLS_ADD +
      '?username=' +
      username;
    const newSkillID = id;
    this.requester.postRequest<number>(url, id).subscribe((returnData) => {});
  }

  getAllSkills(skills: Array<Skills>, options: SkillOptions) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.SKILLS_GET_ALL;
    let out;
    this.requester.getRequest<Skills>(url).subscribe((returnData) => {
      out = <Array<Skills>>(<unknown>returnData);
      out.forEach((element) => {
        options.skillNames.add(element.skillName);
        options.skillLevels.add(element.skillLevel);
        skills.push({
          id: element.id,
          skillName: element.skillName,
          skillLevel: element.skillLevel,
        });
      });
    });
  }
}
