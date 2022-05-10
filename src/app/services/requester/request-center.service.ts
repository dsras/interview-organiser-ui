import { Injectable } from '@angular/core';
import { Requester } from '../requester/requester.service';
import { userData, skills, applicant, SkillOptions } from '../../shared/models/types';
import { APPCONSTANTS } from '../../shared/constants/app.constant';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RequestCenterService {
  constructor(
    private requester: Requester,
    private pipe: DatePipe,
  ) {}

  getUser(username: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.USER_FIND +
      '?username=' +
      username;
    this.requester.getRequest<userData>(url).subscribe((returnData) => {
      return returnData;
    });
  }

  // ? Does this replace getUser() when deployed ?
  getUsername() {
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
  getSkills(username: string): Array<skills> {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.SKILLS_GET +
      '?username=' +
      username;
    let out;
    this.requester.getRequest<skills>(url).subscribe((returnData) => {
      out = returnData;
    });
    out = <Array<skills>>(<unknown>out);
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

  getAllSkills(skills: Array<skills>, options: SkillOptions) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.SKILLS_GET_ALL;
    let out;
    this.requester.getRequest<skills>(url).subscribe((returnData) => {
      out = <Array<skills>>(<unknown>returnData);
      out.forEach((element) => {
        options.names.add(element.skillName);
        options.levels.add(element.skillLevel);
        skills.push({
          id: element.id,
          skillName: element.skillName,
          skillLevel: element.skillLevel,
        });
      });
    });
  }

  // ? Not sure whether this is needed or just a test method
  addApplicant() {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.APPLICANT_ADD;
    const newApplicant = new applicant(
      'ted',
      'testerton',
      'ted@test.com',
      100,
      1
    );
    this.requester
      .postRequest<applicant>(url, newApplicant)
      .subscribe((returnData) => {});
  }

  getAllApplicants(applicantList: string[]) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.APPLICANT_ALL;
    let out;
    this.requester.getRequest<applicant>(url).subscribe((returnData) => {
      out = <Array<applicant>>(<unknown>returnData);
      out.forEach((ele) => {
        applicantList.push(ele.firstName + ',');
      });
    });

    out = <Array<applicant>>(<unknown>out);
    return out;
  }

  dateToStringTime(date: Date): string {
    return '' + this.pipe.transform(date, 'HH:mm');
  }

  dateToStringDate(date: Date): string {
    return '' + this.pipe.transform(date, 'yyyy-MM-dd');
  }
  // ? to be removed?
  // demo(){

  //   let url = "http://localhost:8080/users/user?username=test_user1";
  //   this.requester.getRequest<userData>(url).subscribe(returnData =>{
  //     console.log(returnData);
  //   })

  //   url = "http://localhost:8080/skills/skill?name=running";
  //   this.requester.getRequest<skills>(url).subscribe(returnData =>{
  //     console.log(returnData);
  //   })

  //   const newSkill = new skills(1,"running", "expert");
  //   url = "http://localhost:8080/skills/new";
  //   this.requester.postRequest<skills>(url, newSkill).subscribe(returnData=>{
  //     console.log(returnData);
  //   })

  // }
}
