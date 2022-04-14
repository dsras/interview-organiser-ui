import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Requester } from '../requester/requester.service';
import { 
  data,
  userData,
  skills,
  availability,
  interview,
  skillIdOnly
 }from '../requester/requestBodyTypes/types'
import{
  APPCONSTANTS
}from '../../constants/app.constant'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { COLOURS } from '../../constants/colours.constant';
import { appendFile } from 'fs';
import { start } from 'repl';


@Injectable({
  providedIn: 'root'
})
export class RequestCenterService {

  constructor(private requester: Requester ) { }


  addAvailability(date: string, startTime: string, endTime: string){
    var newDate = new Date(date);
    var newStart = new Date(startTime);
    var newEnd = new Date(endTime);

    var dateString = newDate.getFullYear().toString() + "-" + this.bufTimeString((newDate.getUTCMonth() + 1).toString()) + "-" + newDate.getDate().toString();
    var startString = this.bufTimeString(newStart.getHours().toString()) + ":" + this.bufTimeString(newStart.getMinutes().toString());
    var endString = this.bufTimeString(newEnd.getHours().toString()) + ":" + this.bufTimeString(newEnd.getMinutes().toString());

    var newAvail = new availability(dateString, startString, endString);
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ADD;
    var out;

    this.requester.postRequest<availability>(url, newAvail).subscribe(returnData=>{
      console.log(returnData);
      out = <availability><unknown>returnData;
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
  addInterview(interviewerID: number, applicantID: number, interviewDate: string, timeStart: string, timeEnd: string, skillID: number ){
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ADD;
    var newInterview = new interview(interviewerID, applicantID, interviewDate, timeStart, timeEnd, skillID);
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
      console.log(returnData);
    })
  }
  getAllSkills(skills: skills[], skillNames: Set<string>, levels: Set<string>) {
    var url = APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.SKILLS_GET_ALL;
    var out;
    this.requester.getRequest<skills>(url).subscribe(returnData=>{
      out = <Array<skills>><unknown>returnData;
      console.log(out);
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
