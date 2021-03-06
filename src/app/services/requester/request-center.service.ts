import { Injectable } from '@angular/core';
import { Requester } from '../requester/requester.service';
import { UserData, Skills, SkillOptions } from '../../shared/models/types';
import { APPCONSTANTS } from '../../shared/constants/app.constant';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestCenterService {
  constructor(private requester: Requester, private pipe: DatePipe) {}

  getUserRoles(username: string):Observable<string[]> {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.ROLES_GET.replace('username', username);

    return this.requester.getRequest<string[]>(url);
  
  }

  getUser(username: string): void {
    console.log('Calling');
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.USER +
      '/' +
      username;
    this.requester.getRequest<UserData>(url).subscribe((returnData) => {
      return returnData;
    });
  }

  getUserData(username: string): Observable<any> {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.USER +
      '/' +
      username;
    return this.requester.getRequest<UserData>(url);
  }

  // ! not tested
  getSkills(username: string): Array<Skills> {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.SKILLS +
      '/' +
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
      APPCONSTANTS.APICONSTANTS.SKILLS +
      '/' +
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
