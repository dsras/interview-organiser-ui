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
 }from '../requester/requestBodyTypes/types'
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
    var firstDate = new Date(first);
    var lastDate = new Date(last)
    var newStart = new Date(start);
    var newEnd = new Date(end);

    var firstDateString = firstDate.getFullYear().toString() + "-" + this.bufTimeString((firstDate.getUTCMonth() + 1).toString()) + "-" + this.bufTimeString(firstDate.getDate().toString());
    var lastDateString = lastDate.getFullYear().toString() + "-" + this.bufTimeString((lastDate.getUTCMonth() + 1).toString()) + "-" + this.bufTimeString(lastDate.getDate().toString());

    var startString = this.bufTimeString(newStart.getHours().toString()) + ":" + this.bufTimeString(newStart.getMinutes().toString());
    var endString = this.bufTimeString(newEnd.getHours().toString()) + ":" + this.bufTimeString(newEnd.getMinutes().toString());

    var newAvail = new availabilityRange(firstDateString, lastDateString, startString, endString);
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ADD;
    var out;

    this.requester.postRequest<availabilityRange>(url, newAvail).subscribe(returnData=>{
      out = <availabilityRange><unknown>returnData;
    })
    return out;
  }

  bufTimeString(input:string){
    var out = "";
    if(input.length < 2){
      out+="0"+ input;
      return out;
    }
    return input;  
  }

  getMyAvailability(events: CalendarEvent[]){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_GET;
    var out;

    this.requester.getRequest<availability>(url).subscribe(returnData=>{
      out = <Array<availability>><unknown>returnData;
      out.forEach(element => {
        var start = new Date(element.date);
        var end = new Date(element.date);

        var times1 = element.start_time.split(":");
        var times2 = element.end_time.split(":");
        
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
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_SKILL;
    var started = false;
    input.forEach(element =>{

      url += (started?",":"")+element.toString();
      started = true;
    })
    this.requester.getRequest<availability>(url).subscribe(returnData=>{
      console.log(returnData);
      return returnData;
    })
  }
  //! not ready yet
  // getAllAvailability(){
  //   var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_BY_INT;
  //   this.requester.getRequest<interview>(url).subscribe(returnData=>{
  //     console.log(returnData);
  //     return returnData;
  //   })
  // }

  addInterviewForm(formInput: string, additional: string, startTime: Date, endTime: Date){
    var formDecomp = formInput.split(" ");
    var dateString = formDecomp[1];
    if(startTime.toString() ==""){
      var startTimeString = formDecomp[3];
      var endTimeString = this.bufTimeString((Number.parseInt(formDecomp[3].split(':')[0]) + 1).toString())+":"+formDecomp[3].split(':')[1]; 
      
    }
    else{
      var startTimeString = this.dateToTimeString(startTime);
      startTime.setHours(startTime.getHours()+1)
      var endTimeString = this.dateToTimeString(startTime);
    }
    var nameString = formDecomp[9] + " " + formDecomp[10];
    var id = [Number.parseInt(formDecomp[12])];

    this.addInterview(id, dateString, startTimeString, endTimeString, additional);

  }

  addInterview(interviewerID: number[],  interviewDate: string, timeStart: string, timeEnd: string, additionalInfo: string ){
    console.log("Interview send");
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ADD;
    var newInterview = new interview(interviewerID, interviewDate, timeStart, timeEnd, additionalInfo);
    this.requester.postRequest<interview>(url, newInterview).subscribe(returnData=>{
      console.log(returnData);
    })
  }
  getInterviewByInterviewer(events: CalendarEvent[]){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_BY_INT;
    var out;
    this.requester.getRequest<availability>(url).subscribe(returnData=>{
      out=<Array<availability>><unknown>returnData;
      out.forEach(element =>{
        var start = new Date(element.date);
        var end = new Date(element.date);
        var times1 = element.start_time.split(":");
        var times2 = element.end_time.split(":");
        
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
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_BY_REC;
    var out;
    this.requester.getRequest<availability>(url).subscribe(returnData=>{
      console.log(returnData);
      out=<Array<availability>><unknown>returnData;
      out.forEach(element =>{
        console.log(element);
        console.log(element.start_time);
        var start = new Date(element.date);
        var end = new Date(element.date);
        var times1 = element.start_time.split(":");
        var times2 = element.end_time.split(":");
        
        start.setHours(parseInt(times1[0]),parseInt(times1[1]));
        end.setHours(parseInt(times2[0]),parseInt(times2[1]));
        console.log(start);
        console.log(end);
        

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
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ALL;
    this.requester.getRequest<interview>(url).subscribe(returnData=>{
      console.log(returnData);
      return returnData;
    })
  }

  getInterviewsDashboard(interviews: Array<interview>) {
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ALL;
    this.requester.getRequest<interview>(url).subscribe(returnData=>{
      var dataArray = <Array<interview>><unknown>returnData
      dataArray.forEach(element => {
        interviews.push(element)
      });
      // interviews.push(returnData);
      console.warn(interviews[2])
      return interviews
    });
  }
  //*Tested
  getUser(){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.USER_FIND;
    this.requester.getRequest<userData>(url).subscribe(returnData=>{
      console.log(returnData);
      return returnData;
    })
  }
  //! not tested
  getSkills() : Array<skills> {
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.SKILLS_GET;
    var out;
    this.requester.getRequest<skills>(url).subscribe(returnData=>{
      console.log(returnData);
      out = returnData;
    })
    out = <Array<skills>><unknown> out;
    return out;
  }
  addSkills(id: number){//this might need refinement based on the fact that only skill IDs will be passed
    // var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.SKILLS_ADD;
    // var newSkillID = new skillIdOnly(id);
    // this.requester.postRequest<skillIdOnly>(url, newSkillID).subscribe(returnData=>{
    //   console.log(returnData);
    // })

    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.SKILLS_ADD;
    var newSkillID = id;
    this.requester.postRequest<number>(url, id).subscribe(returnData=>{
      // console.log(returnData);
    })
  }
  getAllSkills(skills: skills[], skillNames: Set<string>, levels: Set<string>) {
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.SKILLS_GET_ALL;
    var out;
    this.requester.getRequest<skills>(url).subscribe(returnData=>{
      out = <Array<skills>><unknown>returnData;
      // console.log(out);
      out.forEach(element => {
        // console.log(element);
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
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ALL;
    var out;

    this.requester.getRequest<availability>(url).subscribe(returnData=>{
      console.log("ret" +returnData);
      out = <Array<availability>><unknown>returnData;
      console.log(out);
      out.forEach(element => {
        console.log(element);
        var start = new Date(element.date);
        var end = new Date(element.date);
        var times1 = element.start_time.split(":");
        var times2 = element.end_time.split(":");
        console.log("times1: " + times1);
        console.log("times2: " + times2);
        
        start.setHours(parseInt(times1[0]),parseInt(times1[1]));
        end.setHours(parseInt(times2[0]),parseInt(times2[1]));
        console.log(start);
        console.log(end);
        
        events.push({
            start: start,
            end: end,
            title: 'An event made progmatically',
            color: COLOURS.GREEN_LITE,
          })
          console.log("length of events list: " + events.length);
      });
    })
    out = <Array<availability>><unknown>out;
    return out;
  }

  getAllAvailabilityUI(events: string[]){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ALL;
    var out;

    this.requester.getRequest<availability>(url).subscribe(returnData=>{
      out = <Array<availability>><unknown>returnData;
      console.log(out);
      out.forEach(element => {
        // console.log(element);
        var start = new Date(element.date);
        var end = new Date(element.date);
        var times1 = element.start_time.split(":");
        var times2 = element.end_time.split(":");
        // console.log("times1: " + times1);
        // console.log("times2: " + times2);
        
        start.setHours(parseInt(times1[0]),parseInt(times1[1]));
        end.setHours(parseInt(times2[0]),parseInt(times2[1]));
        // console.log(start);
        // console.log(end);
        
        var startTime = this.bufTimeString(start.getHours().toString()) + ":" + this.bufTimeString(start.getMinutes().toString());
        var endTime = this.bufTimeString(end.getHours().toString()) + ":" + this.bufTimeString(end.getMinutes().toString());

        events.push(
          startTime + " -> " + endTime + "\n")
          console.log("length of events list: " + events.length);
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

    //We take a start date, end date, start time and end time, then check in this range.
    //first take the data and create two date object that can be used to create strings to pass to the calls
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_FILTER;
    var newStartDate= new Date(startDate);
    var newEndDate = new Date(endDate);
    var newStartTime = new Date(startTime); //These two only hold times so we disregard the date which is todays.
    var newEndTime = new Date(endTime);
    newStartDate.setHours(newStartTime.getHours()); //assigning time to dates
    newStartDate.setMinutes(newStartTime.getMinutes());    
    newEndDate.setHours(newEndTime.getHours());
    newEndDate.setMinutes(newEndTime.getMinutes());

    // var refStart = new Date(startDate);
    // var refEnd = new Date(endDate);
    // refStart.setHours(newStartTime.getHours());
    // refStart.setMinutes(newStartTime.getMinutes());    
    // refEnd.setHours(newEndTime.getHours());
    // refEnd.setMinutes(newEndTime.getMinutes());

    //we have a very specific format that dates must be handed through the system 
    var startDateString = newStartDate.getFullYear().toString() + "-" + this.bufTimeString((newStartDate.getUTCMonth() + 1).toString()) + "-" + this.bufTimeString(newStartDate.getDate().toString());
    var endDateString = newEndDate.getFullYear().toString() + "-" + this.bufTimeString((newEndDate.getUTCMonth() + 1).toString()) + "-" + this.bufTimeString(newEndDate.getDate().toString());
    var startString = this.dateToTimeString(newStartTime);
    var endString = this.dateToTimeString(newEndTime);

    var newRange = new interviewRange(startDateString, endDateString, startString, endString, skillsIDList);
    this.requester.postRequestNoType<availabilityForInterviews>(url, newRange).subscribe(returnData=>{
      // console.log("ret data");
      // console.log(returnData);
      var data = <Array<availabilityForInterviews>> returnData;
      // var newInterview = new availabilityForInterviews(data.name, data.id, data.date, data.startTime, data.endTime);
      data.forEach(ele => {
        var earlierTimeDate = this.getEarlierTime(ele.end_time, this.dateToTimeString(newEndTime), true)
        var laterTimeDate = this.getEarlierTime(ele.start_time, this.dateToTimeString(newStartTime), false)

        interviewsReturn.push("On " + ele.date 
        + " between " + this.dateToTimeString(laterTimeDate) + " -> " + this.dateToTimeString(earlierTimeDate)
        + " this is with: " + ele.interviewer + " id: " + ele.interviewer_id 
        /*+ "skills: " + skillsList[skillsIDList[0]]*/);
      })
    })

  }

  dateToTimeString(date:Date){
    return this.bufTimeString(date.getHours().toString()) + ":" + this.bufTimeString(date.getMinutes().toString());
  }
  getEarlierTime(input1: string, input2: string, early:boolean){
    var date1 = new Date();
    var times1 = input1.split(':');
    date1.setHours(Number.parseInt(times1[0]));
    date1.setMinutes(Number.parseInt(times1[1]));
    var date2 = new Date();
    var times2 = input2.split(':');
    date2.setHours(Number.parseInt(times2[0]));
    date2.setMinutes(Number.parseInt(times2[1]));
    if(early){
      return (date1.getTime() < date2.getTime() ? date1 : date2);
    }
    else{
      return (date1.getTime() > date2.getTime() ? date1 : date2);
    }
  }

  addApplicant(){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.APPLICANT_ADD;
    var newApplicant = new applicant("ted", "testerton", "ted@test.com", 100, 1);
    this.requester.postRequest<applicant>(url, newApplicant).subscribe(returnData=>{
      console.log(returnData);
    })
  }
  getAllApplicants(applicantList: string[]){
        
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.APPLICANT_ALL;
    var out;
    this.requester.getRequest<applicant>(url).subscribe(returnData=>{
      console.log(returnData);
      out = <Array<applicant>><unknown>returnData;
      out.forEach(ele=>{
        applicantList.push(ele.firstName +",");
      })
    })
    
    out = <Array<applicant>><unknown> out;
    return out;
  }

  demo(){
    
    

    var url = "http://localhost:8080/users/user?username=test_user1";
    this.requester.getRequest<userData>(url).subscribe(returnData =>{
      console.log(returnData);
      
    })

    url = "http://localhost:8080/skills/skill?name=running";
    this.requester.getRequest<skills>(url).subscribe(returnData =>{
      console.log(returnData);

    })

    var newSkill = new skills(1,"running", "expert");
    url = "http://localhost:8080/skills/new";
    this.requester.postRequest<skills>(url, newSkill).subscribe(returnData=>{
      console.log(returnData);
    })

  }
}
