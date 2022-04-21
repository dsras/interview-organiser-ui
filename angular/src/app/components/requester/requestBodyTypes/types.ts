
export interface data{}
export class skillIdOnly implements data{
    skillId:number;
    constructor(skillId:number){
        this.skillId = skillId;
    }
}

export class userData implements data {
    id: number;
    username: string;
    userpassword: string;
    userEmail: string;
    userMobile: any;
    userName: string;
    businessTitle: string;
    account: any;
    businessUnit: any;
    dateOfJoining: any;
    designation: any;
    location: any;
    priorExperience: any;

    constructor(
    id: number,
    username: string,
    userpassword: string,
    userEmail: string,
    userMobile: any,
    userName: string,
    businessTitle: string,
    account: any,
    businessUnit: any,
    dateOfJoining: any,
    designation: any,
    location: any,
    priorExperience: any){
        this.id = id;
        this.username = username;
        this.userpassword = userpassword;
        this.userEmail = userEmail;
        this.userMobile = userMobile;
        this.userName = userName;
        this.businessTitle = businessTitle;
        this.account = account;
        this.businessUnit = businessUnit;
        this.dateOfJoining = dateOfJoining;
        this.designation = designation;
        this.location = location;
        this.priorExperience = priorExperience;
  }
}

export class skills implements data{
  id: number;
  skillName: string;
  skillLevel:string;

  constructor(id:number, skillName:string, skillLevel:string){
    this.id = id;
    this.skillName = skillName;
    this.skillLevel = skillLevel;
  }

}

export class available implements data{
    date: string;
    startTime: string;
    endTime: string;
    skills: number[];
    constructor(
        date: string,
        startTime: string,
        endTime: string,
        skills: number[]
    ){
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.skills = skills;
    }
}

export class applicant implements data{
    //id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: number;
    skillID: number;
    constructor(
        //id: number,
        firstName: string,
        lastName: string,
        email: string,
        mobile: number,
        skillID: number
    ){
        //this.id = id;
        this.firstName =firstName;
        this.lastName =lastName;
        this.email = email;
        this.mobile = mobile;
        this.skillID = skillID;
    }
}

export class availabilityForInterviews implements data{
    name : string;
    id: number;
    date : string;
    startTime: string;
    endTime: string;
    constructor(
        name: string,
        id: number,
        date: string,
        startTime: string,
        endTime: string
    ){
        this.name = name;
        this.date = date;
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    toString(){
        return ("On " + this.date + " between " + this.startTime + " -> " + this.endTime + " this is with: " + this.name);
    }

}

export class availability implements data{
    date: string;
    start_time: string;
    end_time: string;
    constructor(
        dateStart: string,
        start_time: string,
        end_time: string
    ){
        this.date = dateStart;
        this.start_time = start_time;
        this.end_time = end_time;
    }
}

export class availabilityRange implements data{
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    constructor(
        start_date: string,
        end_date: string,
        start_time: string,
        end_time: string
    ){
        this.start_date = start_date;
        this.end_date = end_date;
        this.start_time = start_time;
        this.end_time = end_time;
    }
}

export class interviewRange implements data{
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    skills: number[];
    constructor(
        start_date: string,
        end_date: string,
        start_time: string,
        end_time: string,
        skills: number[]
    ){
        this.start_date = start_date;
        this.end_date = end_date;
        this.start_time = start_time;
        this.end_time = end_time;
        this.skills = skills;
    }
}

export class interview implements data{
    interviewer_ids: number[];
    //organiserId: number;
    // applicantId: number;
    //roleApplied: number;
    date: string;
    start_time: string;
    end_time: string;
    additional_info: string;
    // skillID: number; 
    //confirmed: number;
    constructor(
        interviewer_ids: number[],
        //organiserId: number,
        // applicantId: number,
        //roleApplied: number,
        date: string,
        start_time: string,
        end_time: string,
        //confirmed: number
        // skillID: number
        additional_info: string,
    ){
        this.interviewer_ids = interviewer_ids;
        //this.organiserId = organiserId;
        // this.applicantId = applicantId;
        //this.roleApplied = roleApplied;
        this.date = date;
        this.start_time = start_time;
        this.end_time = end_time;
        //this.confirmed =confirmed;
        // this.skillID = skillID;
        this.additional_info = additional_info;
    }

}

export class role implements data{
    roleID: number;
    roleName: string;
    description: string;
    constructor(
        roleID: number,
        roleName: string,
        description: string
    ){
        this.roleID =roleID;
        this.roleName = roleName;
        this.description = description;
    }
}