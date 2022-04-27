import { Injectable } from '@angular/core';
import { Requester } from '../requester/requester.service';
import { 
  data,
  userData,
  skills,
  availability,
  interview,
  skillIdOnly,
  applicant,
  interviewRange,
  availabilityRange,
  availabilityForInterviews
 }from '../../constants/types'
import{ APPCONSTANTS }from '../../constants/app.constant'
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { COLOURS } from '../../constants/colours.constant';
import { start } from 'repl';


@Injectable({
  providedIn: 'root'
})
export class RequestCenterService {


  constructor(private requester: Requester ) { }



  addAvailability(first: string, last: string, start: string, end: string){
    const firstDate = new Date(first);
    const lastDate = new Date(last)
    const newStart = new Date(start);
    const newEnd = new Date(end);

    const firstDateString = firstDate.getFullYear().toString() + "-" + this.bufTimeString((firstDate.getUTCMonth() + 1).toString()) + "-" + this.bufTimeString(firstDate.getDate().toString());
    const lastDateString = lastDate.getFullYear().toString() + "-" + this.bufTimeString((lastDate.getUTCMonth() + 1).toString()) + "-" + this.bufTimeString(lastDate.getDate().toString());

    const startString = this.bufTimeString(newStart.getHours().toString()) + ":" + this.bufTimeString(newStart.getMinutes().toString());
    const endString = this.bufTimeString(newEnd.getHours().toString()) + ":" + this.bufTimeString(newEnd.getMinutes().toString());

    const newAvail = new availabilityRange(firstDateString, lastDateString, startString, endString);
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ADD;
    let out;

    this.requester.postRequest<availabilityRange>(url, newAvail).subscribe(returnData=>{
      out = <availabilityRange><unknown>returnData;
    })
    return out;
  }

  bufTimeString(input:string){
    let out = "";
    if(input.length < 2){
      out+="0"+ input;
      return out;
    }
    return input;  
  }

  getMyAvailability(events: CalendarEvent[]){
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_GET;
    let out;

    this.requester.getRequest<availability>(url).subscribe(returnData=>{
      out = <Array<availability>><unknown>returnData;
      out.forEach(element => {
        const start = new Date(element.date);
        const end = new Date(element.date);

        const times1 = element.start_time.split(":");
        const times2 = element.end_time.split(":");
        
        start.setHours(parseInt(times1[0]),parseInt(times1[1]));
        end.setHours(parseInt(times2[0]),parseInt(times2[1]));

        
        events.push({
            start: start,
            end: end,
            title: 'availability',
            color: COLOURS.BLUE_DARK,
          })
      });
    })
    out = <Array<availability>><unknown>out;
    return out;
  }

  getAvailabilityOnSkill(input: Array<number>){
    let url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_SKILL;
    let started = false;
    input.forEach(element =>{

      url += (started?",":"")+element.toString();
      started = true;
    })
    this.requester.getRequest<availability>(url).subscribe(returnData=>{
      return returnData;
    })
  }
  //! not ready yet
  // getAllAvailability(){
  //   const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_BY_INT;
  //   this.requester.getRequest<interview>(url).subscribe(returnData=>{
  //     return returnData;
  //   })
  // }

  addInterviewForm(formInput: string, additional: string, startTime: Date){
    const formDecomp = formInput.split(" ");
    const dateString = formDecomp[1];
    let startTimeString ;
    let endTimeString = "";
    console.log(startTime.toString());
    if(startTime.toString() != ""){
      startTimeString = this.dateToStringTime(startTime);

      startTime.setHours(startTime.getHours()+1);

      endTimeString = this.dateToStringTime(startTime);
    }
    else{
      startTimeString = formDecomp[3];

      endTimeString = this.bufTimeString(((Number.parseInt(startTimeString.split(':')[0]))+1).toString()) + ':' + this.bufTimeString((Number.parseInt(startTimeString.split(':')[1])).toString())
    }
    // const nameString = formDecomp[9] + " " + formDecomp[10];
    const id = [Number.parseInt(formDecomp[12])];

    this.addInterview(id, dateString, startTimeString, endTimeString, additional);

  }

  addInterview(interviewerID: number[],  interviewDate: string, timeStart: string, timeEnd: string, additionalInfo: string ){
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ADD;
    const newInterview = new interview(interviewerID, interviewDate, timeStart, timeEnd, additionalInfo);
    this.requester.postRequest<interview>(url, newInterview).subscribe(returnData=>{
    })
  }

  getInterviewByInterviewer(events: CalendarEvent[]){
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_BY_INT;
    let out;
    this.requester.getRequest<availability>(url).subscribe(returnData=>{
      out=<Array<availability>><unknown>returnData;
      out.forEach(element =>{
        const start = new Date(element.date);
        const end = new Date(element.date);
        const times1 = element.start_time.split(":");
        const times2 = element.end_time.split(":");
        
        start.setHours(parseInt(times1[0]),parseInt(times1[1]));
        end.setHours(parseInt(times2[0]),parseInt(times2[1]));
        

        // var dateString = start.getFullYear().toString() + "-" + this.bufTimeString((start.getUTCMonth() + 1).toString()) + "-" + start.getDate().toString();
        // var startString = this.bufTimeString(start.getHours().toString()) + ":" + this.bufTimeString(start.getMinutes().toString());
        // var endString = this.bufTimeString(end.getHours().toString()) + ":" + this.bufTimeString(end.getMinutes().toString());
    

        events.push({
            start: start,
            end: end,
            title: 'interview',
            color: COLOURS.RED_DARK,
          })
      })
      return returnData;
    })
  }
  //! Only for use in calendar app
  getInterviewByRecruiter(events: CalendarEvent[]){
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_BY_REC;
    let out;
    this.requester.getRequest<availability>(url).subscribe(returnData=>{
      out=<Array<availability>><unknown>returnData;
      out.forEach(element =>{
        const start = new Date(element.date);
        const end = new Date(element.date);
        const times1 = element.start_time.split(":");
        const times2 = element.end_time.split(":");
        
        start.setHours(parseInt(times1[0]),parseInt(times1[1]));
        end.setHours(parseInt(times2[0]),parseInt(times2[1]));

        // var dateString = start.getFullYear().toString() + "-" + this.bufTimeString((start.getUTCMonth() + 1).toString()) + "-" + start.getDate().toString();
        // var startString = this.bufTimeString(start.getHours().toString()) + ":" + this.bufTimeString(start.getMinutes().toString());
        // var endString = this.bufTimeString(end.getHours().toString()) + ":" + this.bufTimeString(end.getMinutes().toString());
    
        events.push({
            start: start,
            end: end,
            title: 'interview',
            color: COLOURS.RED_DARK,
          })
      })
      return returnData;
    })
  }
  //? Currently not referenced
  getInterviewAll(){
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ALL;
    this.requester.getRequest<interview>(url).subscribe(returnData=>{
      return returnData;
    })
  }

  getInterviewsDashboard(interviews: Array<interview>) {
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ALL;
    this.requester.getRequest<interview>(url).subscribe(returnData=>{
      let dataArray = <Array<interview>><unknown>returnData
      dataArray.forEach(element => {
        interviews.push(element)
      });
      return interviews
    });
  }
  //*Tested
  getUser(){
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.USER_FIND;
    this.requester.getRequest<userData>(url).subscribe(returnData=>{
      return returnData;
    })
  }
  //! not tested
  getSkills() : Array<skills> {
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.SKILLS_GET;
    let out;
    this.requester.getRequest<skills>(url).subscribe(returnData=>{
      out = returnData;
    })
    out = <Array<skills>><unknown> out;
    return out;
  }

  addSkills(id: number){
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.SKILLS_ADD;
    const newSkillID = id;
    this.requester.postRequest<number>(url, id).subscribe(returnData=>{
    })
  }

  getAllSkills(skills: skills[], skillNames: Set<string>, levels: Set<string>) {
    console.log("skills call");
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.SKILLS_GET_ALL;
    let out;
    this.requester.getRequest<skills>(url).subscribe(returnData=>{
      out = <Array<skills>><unknown>returnData;
      out.forEach(element => {
        console.log(element);
        skillNames.add(element.skillName);
        levels.add(element.skillLevel);
        skills.push({
          id: element.id,
          skillName: element.skillName,
          skillLevel: element.skillLevel,
        })
      });
    })
  }
  //* Tested
  getAllAvailability(events: CalendarEvent[]){
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ALL;
    let out;

    this.requester.getRequest<availability>(url).subscribe(returnData=>{
      out = <Array<availability>><unknown>returnData;
      out.forEach(element => {
        const start = new Date(element.date);
        const end = new Date(element.date);
        const times1 = element.start_time.split(":");
        const times2 = element.end_time.split(":");
        
        start.setHours(parseInt(times1[0]),parseInt(times1[1]));
        end.setHours(parseInt(times2[0]),parseInt(times2[1]));
        
        events.push({
            start: start,
            end: end,
            title: 'An event made progmatically',
            color: COLOURS.GREEN_LITE,
          })
      });
    })
    out = <Array<availability>><unknown>out;
    return out;
  }

  getAllAvailabilityUI(events: string[]){
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ALL;
    let out;

    this.requester.getRequest<availability>(url).subscribe(returnData=>{
      out = <Array<availability>><unknown>returnData;
      out.forEach(element => {
        const start = new Date(element.date);
        const end = new Date(element.date);
        const times1 = element.start_time.split(":");
        const times2 = element.end_time.split(":");
        
        start.setHours(parseInt(times1[0]),parseInt(times1[1]));
        end.setHours(parseInt(times2[0]),parseInt(times2[1]));
        
        const startTime = this.bufTimeString(start.getHours().toString()) + ":" + this.bufTimeString(start.getMinutes().toString());
        const endTime = this.bufTimeString(end.getHours().toString()) + ":" + this.bufTimeString(end.getMinutes().toString());

        events.push(
          startTime + " -> " + endTime + "\n")
      });
    })
    out = <Array<availability>><unknown>out;
    return out;
  }
  // * in progress
  getAvailabilityByRange(
      startDate:string, 
      endDate:string, 
      startTime: string, 
      endTime: string, 
      skillsIDList:number[], 
      interviewsReturn: string[]){


    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_FILTER;
    const newStartDate= new Date(startDate);
    const newEndDate = new Date(endDate);
    console.log(startTime);
    const newStartTime = new Date(startTime);
    const newEndTime = new Date(endTime);
    newStartTime.setDate(newStartDate.getDate());
    newEndTime.setDate(newStartDate.getDate());
    console.log(newStartTime);

    const startDateString = newStartDate.getFullYear().toString() + "-" + this.bufTimeString((newStartDate.getUTCMonth() + 1).toString()) + "-" + this.bufTimeString(newStartDate.getDate().toString());
    const endDateString = newEndDate.getFullYear().toString() + "-" + this.bufTimeString((newEndDate.getUTCMonth() + 1).toString()) + "-" + this.bufTimeString(newEndDate.getDate().toString());
    const startString = this.bufTimeString(newStartTime.getHours().toString()) + ":" + this.bufTimeString(newStartTime.getMinutes().toString());
    const endString = this.bufTimeString(newEndTime.getHours().toString()) + ":" + this.bufTimeString(newEndTime.getMinutes().toString());

    const newRange = new interviewRange(startDateString, endDateString, startString, endString, skillsIDList);
    this.requester.postRequestNoType<availabilityForInterviews>(url, newRange).subscribe(returnData=>{
      let data = <Array<availabilityForInterviews>> returnData;
      data.forEach(ele => {
        console.log(ele);
        var refStart = new Date(newStartTime);
        var refEnd = new Date(newStartTime);
        refStart.setHours(Number.parseInt(ele.start_time.split(':')[0]),Number.parseInt(ele.start_time.split(':')[1]))
        refEnd.setHours(Number.parseInt(ele.end_time.split(':')[0]),Number.parseInt(ele.end_time.split(':')[1]))

        var startInput = "";
        var endInput = "";
        if(refStart.getTime() > newStartTime.getTime()){
          startInput = this.dateToStringTime(refStart);
        }
        else{
          startInput = this.dateToStringTime(newStartTime);
        }
        if(refEnd.getTime() < newEndTime.getTime()){
          endInput = this.dateToStringTime(refEnd);
        }
        else{
          endInput = this.dateToStringTime(newEndTime);
        }

        interviewsReturn.push("On " + ele.date 
        + " between " + startInput + " -> " + endInput
        + " this is with: " + ele.interviewer + " id: " + ele.interviewer_id 
        );
      })
    })

  }
  dateToStringTime(date:Date){
    return (this.bufTimeString(date.getHours().toString()) + ':' + this.bufTimeString(date.getMinutes().toString()));
  }
  // ? Not sure whether this is needed or just a test method
  addApplicant(){
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.APPLICANT_ADD;
    const newApplicant = new applicant("ted", "testerton", "ted@test.com", 100, 1);
    this.requester.postRequest<applicant>(url, newApplicant).subscribe(returnData=>{
    })
  }

  getAllApplicants(applicantList: string[]){
        
    const url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.APPLICANT_ALL;
    let out;
    this.requester.getRequest<applicant>(url).subscribe(returnData=>{
      out = <Array<applicant>><unknown>returnData;
      out.forEach(ele=>{
        applicantList.push(ele.firstName +",");
      })
    })
    
    out = <Array<applicant>><unknown> out;
    return out;
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
