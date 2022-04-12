import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Requester } from '../requester/requester.service';
import { 
  data,
  userData,
  skills,
  availability,
  interview
 }from '../requester/requestBodyTypes/types'
import{
  APPCONSTANTS
}from '../../constants/app.constant'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { colors } from '../calendar/header/colours';

@Injectable({
  providedIn: 'root'
})
export class RequestCenterService {

  constructor(private requester: Requester ) { }


  addAvailability(date: string, startTime: string, endTime: string){
    var newAvail = new availability(date, startTime, endTime);
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ADD;
    var out;

    this.requester.postRequest<availability>(url, newAvail).subscribe(returnData=>{
      console.log(returnData);
      out = <availability><unknown>returnData;
    })
    return out;
  }
  getMyAvailability(events: CalendarEvent[]){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_GET;
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
            color: colors.RED,
          })
          console.log("length of events list: " + events.length);
      });
    })
    out = <Array<availability>><unknown>out;
    return out;
  }
  addInterview(interviewerID: number, applicantID: number, roleApplied: number, interviewDate: string, timeStart: string, timeEnd: string, confirmed: number ){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ADD;
    var newInterview = new interview(interviewerID, applicantID, roleApplied, interviewDate, timeStart, timeEnd, confirmed);
    this.requester.postRequest<interview>(url, newInterview).subscribe(returnData=>{
      console.log(returnData);
    })
  }
  getInterviewByInterviewer(){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_BY_INT;
    this.requester.getRequest<interview>(url).subscribe(returnData=>{
      console.log(returnData);
      return returnData;
    })
  }
  getInterviewByRecruiter(){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_BY_REC;
    this.requester.getRequest<interview>(url).subscribe(returnData=>{
      console.log(returnData);
      return returnData;
    })
  }
  getInterviewAll(){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ALL;
    this.requester.getRequest<interview>(url).subscribe(returnData=>{
      console.log(returnData);
      return returnData;
    })
  }
  getUser(){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.USER_FIND;
    this.requester.getRequest<userData>(url).subscribe(returnData=>{
      console.log(returnData);
      return returnData;
    })
  }
  getSkills(){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.SKILLS_GET;
    this.requester.getRequest<skills>(url).subscribe(returnData=>{
      console.log(returnData);
      return returnData;
    })
  }
  addSkills(){//this might need refinement based on the fact that only skill IDs will be passed
    // var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.SKILLS_ADD;
    // //////////////////////////////
    // this.requester.postRequest<skills>(url/*, newSkills*/).subscribe(returnData=>{
    //   console.log(returnData);
    // })
  }
  getAllSkills(){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.SKILLS_GET_ALL;
    this.requester.getRequest<skills>(url).subscribe(returnData=>{
      console.log(returnData);
      return returnData;
    })
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
