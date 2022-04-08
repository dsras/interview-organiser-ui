
export interface data{}

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
    date: Date;
    startTime: Date;
    endTime: Date;
    skills: number[];
    constructor(
        date: Date,
        startTime: Date,
        endTime: Date,
        skills: number[]
    ){
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.skills = skills;
    }
}

export class applicant implements data{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: number;
    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        mobile: number
    ){
        this.id = id;
        this.firstName =firstName;
        this.lastName =lastName;
        this.email = email;
        this.mobile = mobile;
    }
}

export class availability implements data{
    userID: number;
    date: Date;
    start_time: Date;
    end_time: Date;
    constructor(
        userID: number,
        date: Date,
        start_time: Date,
        end_time: Date
    ){
        this.userID = userID;
        this.date = date;
        this.start_time = start_time;
        this.end_time = end_time;
    }
}

export class interview implements data{
    interviewerId: number;
    organiserId: number;
    applicantId: number;
    roleApplied: number;
    interviewDate: Date;
    timeStart: Date;
    timeEnd: Date;
    confirmed: number;
    constructor(
        interviewerId: number,
        organiserId: number,
        applicantId: number,
        roleApplied: number,
        interviewDate: Date,
        timeStart: Date,
        timeEnd: Date,
        confirmed: number
    ){
        this.interviewerId = interviewerId
        this.organiserId = organiserId;
        this.applicantId = applicantId;
        this.roleApplied = roleApplied;
        this.interviewDate = interviewDate;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.confirmed =confirmed;
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