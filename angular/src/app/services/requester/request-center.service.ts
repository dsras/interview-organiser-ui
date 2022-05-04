import { Injectable } from '@angular/core';
import { Requester } from '../requester/requester.service';
import {
  userData,
  skills,
  availability,
  interview,
  applicant,
  interviewRange,
  availabilityRange,
  availabilityForInterviews,
  statusUpdate,
  interviewReturn,
} from '../../models/types';
import { APPCONSTANTS } from '../../constants/app.constant';
import { CalendarEvent } from 'angular-calendar';
import { COLOURS } from '../../constants/colours.constant';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RequestCenterService {
  constructor(private requester: Requester, private pipe: DatePipe) {}

  updateStatus(id: number, status: string, isStatus: boolean) {
    let url: string = '';
    if (isStatus) {
      url =
        APPCONSTANTS.APICONSTANTS.BASE_URL +
        APPCONSTANTS.APICONSTANTS.STATUS_UPDATE;
    } else {
      url =
        APPCONSTANTS.APICONSTANTS.BASE_URL +
        APPCONSTANTS.APICONSTANTS.OUTCOME_UPDATE;
    }

    let newStatus = new statusUpdate(id, status);
    this.requester.postRequest<statusUpdate>(url, newStatus);
  }

  addAvailability(first: string, last: string, start: string, end: string) {
    const firstDate: Date = new Date(first);
    const lastDate: Date = new Date(last);
    const newStart: Date = new Date(start);
    const newEnd: Date = new Date(end);

    const firstDateString: string = this.dateToStringDate(firstDate);
    const lastDateString: string = this.dateToStringDate(lastDate);

    const startString: string = this.dateToStringTime(newStart);
    const endString: string = this.dateToStringTime(newEnd);

    const newAvail: availabilityRange = new availabilityRange(
      firstDateString,
      lastDateString,
      startString,
      endString
    );
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ADD;
    let out: availabilityRange;

    this.requester
      .postRequest<availabilityRange>(url, newAvail)
      .subscribe((returnData) => {
        out = <availabilityRange>(<unknown>returnData);
      });
  }

  // bufTimeString(input: string) {
  //   let out = "";
  //   if (input.length < 2) {
  //     out += "0" + input;
  //     return out;
  //   }
  //   return input;
  // }

  getMyAvailability(events: CalendarEvent[], username: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.AVAIL_GET +
      '?username=' +
      username;
    let out;

    this.requester.getRequest<availability>(url).subscribe((returnData) => {
      out = <Array<availability>>(<unknown>returnData);
      out.forEach((element) => {
        const start = new Date(element.date);
        const end = new Date(element.date);
        const id = element.availability_id;
        const times1 = element.start_time.split(':');
        const times2 = element.end_time.split(':');

        start.setHours(parseInt(times1[0]), parseInt(times1[1]));
        end.setHours(parseInt(times2[0]), parseInt(times2[1]));

        console.log('Made it this far at least');
        events.push({
          id: id,
          start: start,
          end: end,
          title: 'availability',
          color: COLOURS.BLUE_DARK,
        });
      });
      return out;
    });
    // ? this line didn't seem to do anything
    // out = <Array<availability>><unknown>out;
    //return out
  }

  getAvailabilityOnSkill(input: Array<number>) {
    let url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.AVAIL_SKILL;
    let started: boolean = false;
    input.forEach((element) => {
      url += (started ? ',' : '') + element.toString();
      started = true;
    });
    this.requester.getRequest<availability>(url).subscribe((returnData) => {
      return returnData;
    });
  }

  // ? Is the formDecomp an array of the form values?
  addInterviewForm(formInput: string, additional: string, startTime: Date) {
    const formDecomp: string[] = formInput.split(' ');
    const dateString: string = formDecomp[1];
    let startTimeString: string;
    let endTimeString = '';
    if (startTime.toString() != '') {
      startTimeString = this.dateToStringTime(startTime);

      startTime.setHours(startTime.getHours() + 1);

      endTimeString = this.dateToStringTime(startTime);
    } else {
      startTimeString = formDecomp[3];
      endTimeString = this.dateToStringTime(new Date(startTimeString));
    }
    const id = [Number.parseInt(formDecomp[12])];

    this.addInterview(
      id,
      dateString,
      startTimeString,
      endTimeString,
      additional
    );
  }

  addInterview(
    interviewerID: number[],
    interviewDate: string,
    timeStart: string,
    timeEnd: string,
    additionalInfo: string
  ) {
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ADD;
    const newInterview: interview = new interview(
      interviewerID,
      interviewDate,
      timeStart,
      timeEnd,
      additionalInfo
    );
    this.requester
      .postRequest<interview>(url, newInterview)
      .subscribe((returnData) => {});
  }

  getInterviewByInterviewer(events: CalendarEvent[], username: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_BY_INT +
      '?username=' +
      username;
    console.log(url);
    let out;
    this.requester.getRequest<interviewReturn>(url).subscribe((returnData) => {
      out = <Array<interviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        const start = new Date(element.date);
        const end = new Date(element.date);
        const int_id = element.interview_id;
        const interviewers = element.interviewers;
        const times1 = element.start_time.split(':');
        const times2 = element.end_time.split(':');

        start.setHours(parseInt(times1[0]), parseInt(times1[1]));
        end.setHours(parseInt(times2[0]), parseInt(times2[1]));

        events.push({
          id: int_id,
          meta: interviewers,
          start: start,
          end: end,
          title: 'interview',
          color: COLOURS.RED_DARK,
        });
      });
      return returnData;
    });
  }
  //! Only for use in calendar app
  getInterviewByRecruiter(events: CalendarEvent[], username: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_BY_REC +
      '?username=' +
      username;
    let out;
    this.requester.getRequest<interviewReturn>(url).subscribe((returnData) => {
      out = <Array<interviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        const start: Date = new Date(element.date);
        const end: Date = new Date(element.date);
        const id: number = element.interview_id;
        const panel: string[] = element.interviewers;
        const times1: string[] = element.start_time.split(':');
        const times2: string[] = element.end_time.split(':');

        start.setHours(parseInt(times1[0]), parseInt(times1[1]));
        end.setHours(parseInt(times2[0]), parseInt(times2[1]));

        events.push({
          id: id,
          meta: panel,
          start: start,
          end: end,
          title: 'interview',
          color: COLOURS.RED_DARK,
        });
      });
      return returnData;
    });
  }
  //? Currently not referenced
  getInterviewAll() {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ALL;
    this.requester.getRequest<interview>(url).subscribe((returnData) => {
      return returnData;
    });
  }

  getInterviewsDashboard(interviews: Array<interview>) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ALL;
    this.requester.getRequest<interview>(url).subscribe((returnData) => {
      let dataArray = <Array<interview>>(<unknown>returnData);
      dataArray.forEach((element) => {
        interviews.push(element);
      });
      return interviews;
    });
  }
  //*Tested
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
  //! not tested
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

  getAllSkills(skills: skills[], skillNames: Set<string>, levels: Set<string>) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.SKILLS_GET_ALL;
    let out;
    this.requester.getRequest<skills>(url).subscribe((returnData) => {
      out = <Array<skills>>(<unknown>returnData);
      out.forEach((element) => {
        skillNames.add(element.skillName);
        levels.add(element.skillLevel);
        skills.push({
          id: element.id,
          skillName: element.skillName,
          skillLevel: element.skillLevel,
        });
      });
    });
  }
  //* Tested
  getAllAvailability(events: CalendarEvent[]) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ALL;
    let out;

    this.requester.getRequest<availability>(url).subscribe((returnData) => {
      out = <Array<availability>>(<unknown>returnData);
      out.forEach((element) => {
        const start = new Date(element.date);
        const end = new Date(element.date);
        const id = element.availability_id;
        const times1 = element.start_time.split(':');
        const times2 = element.end_time.split(':');

        start.setHours(parseInt(times1[0]), parseInt(times1[1]));
        end.setHours(parseInt(times2[0]), parseInt(times2[1]));

        events.push({
          id: id,
          start: start,
          end: end,
          title: 'An event made progmatically',
          color: COLOURS.GREEN_LITE,
        });
      });
    });
    out = <Array<availability>>(<unknown>out);
    return out;
  }

  getAllAvailabilityUI(events: string[]) {
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ALL;
    let out: Array<availability>;

    this.requester.getRequest<availability>(url).subscribe((returnData) => {
      out = <Array<availability>>(<unknown>returnData);
      out.forEach((element) => {
        const start: Date = new Date(element.date);
        const end: Date = new Date(element.date);
        const times1: string[] = element.start_time.split(':');
        const times2: string[] = element.end_time.split(':');

        start.setHours(parseInt(times1[0]), parseInt(times1[1]));
        end.setHours(parseInt(times2[0]), parseInt(times2[1]));

        const startTime: string = this.dateToStringTime(start);
        const endTime: string = this.dateToStringTime(end);

        events.push(startTime + ' -> ' + endTime + '\n');
      });
      return out;
    });
    // out = <Array<availability>><unknown>out;
    // return out;
  }
  // * in progress
  getAvailabilityByRange(
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    skillsIDList: number[],
    interviewsReturn: string[]
  ) {
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.AVAIL_FILTER;
    const newStartDate: Date = new Date(startDate);
    const newEndDate: Date = new Date(endDate);
    const newStartTime: Date = new Date(startTime);
    const newEndTime: Date = new Date(endTime);

    newStartTime.setDate(newStartDate.getDate());
    newEndTime.setDate(newStartDate.getDate());

    const startDateString: string = this.dateToStringDate(newStartDate);
    const endDateString: string = this.dateToStringDate(newEndDate);
    const startString: string = this.dateToStringTime(newStartTime);
    const endString: string = this.dateToStringTime(newEndTime);

    const newRange: interviewRange = new interviewRange(
      startDateString,
      endDateString,
      startString,
      endString,
      skillsIDList
    );
    this.requester
      .postRequestNoType<availabilityForInterviews>(url, newRange)
      .subscribe((returnData) => {
        let data = <Array<availabilityForInterviews>>returnData;
        data.forEach((ele) => {
          let refStart: Date = new Date(newStartTime);
          let refEnd: Date = new Date(newStartTime);
          refStart.setHours(
            Number.parseInt(ele.start_time.split(':')[0]),
            Number.parseInt(ele.start_time.split(':')[1])
          );
          refEnd.setHours(
            Number.parseInt(ele.end_time.split(':')[0]),
            Number.parseInt(ele.end_time.split(':')[1])
          );

          let startInput: string = '';
          let endInput: string = '';
          if (refStart.getTime() > newStartTime.getTime()) {
            startInput = this.dateToStringTime(refStart);
          } else {
            startInput = this.dateToStringTime(newStartTime);
          }
          if (refEnd.getTime() < newEndTime.getTime()) {
            endInput = this.dateToStringTime(refEnd);
          } else {
            endInput = this.dateToStringTime(newEndTime);
          }

          interviewsReturn.push(
            'On ' +
              ele.date +
              ' between ' +
              startInput +
              ' -> ' +
              endInput +
              ' this is with: ' +
              ele.interviewer +
              ' id: ' +
              ele.interviewer_id
          );
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
