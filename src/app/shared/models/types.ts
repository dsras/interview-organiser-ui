export interface Data {}
export class skillIdOnly implements Data {
  skillId: number;
  constructor(skillId: number) {
    this.skillId = skillId;
  }
}

export class StatusUpdate implements Data {
  interview_id: number;
  update: string;
  constructor(interview_id: number, update: string) {
    this.interview_id = interview_id;
    this.update = update;
  }
}
export class UserData implements Data {
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
  roles: Array<AppRoles>;

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
    priorExperience: any,
    roles: Array<AppRoles>
  ) {
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
    this.roles = roles;
  }
}

export class Skills implements Data {
  id: number;
  skillName: string;
  skillLevel: string;

  constructor(id: number, skillName: string, skillLevel: string) {
    this.id = id;
    this.skillName = skillName;
    this.skillLevel = skillLevel;
  }
}

export class Available implements Data {
  date: string;
  startTime: string;
  endTime: string;
  skills: number[];
  constructor(
    date: string,
    startTime: string,
    endTime: string,
    skills: number[]
  ) {
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.skills = skills;
  }
}

export class applicant implements Data {
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
    mobile: number | any,
    skillID: number
  ) {
    //this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.mobile = mobile;
    this.skillID = skillID;
  }
}

export class AvailabilityForInterviews implements Data {
  interviewer: string;
  interviewerId: number;
  availabilityId: number;
  date: string;
  startTime: string;
  endTime: string;
  constructor(
    interviewer: string,
    interviewerId: number,
    availabilityId: number,
    date: string,
    startTime: string,
    endTime: string
  ) {
    this.interviewer = interviewer;
    this.interviewerId = interviewerId;
    this.date = date;
    this.availabilityId = availabilityId;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

export class Availability implements Data {
  availabilityId: number;
  date: string;
  startTime: string;
  endTime: string;
  constructor(
    availabilityId: number,
    dateStart: string,
    startTime: string,
    endTime: string
  ) {
    this.availabilityId = availabilityId;
    this.date = dateStart;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

export class AvailabilityRange implements Data {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  constructor(
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

export class InterviewRange implements Data {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  skills: number[];
  constructor(
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    skills: number[]
  ) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.skills = skills;
  }
}

export class Interview implements Data {
  interviewerIds: number[];
  //organiserId: number;
  // applicantId: number;
  //roleApplied: number;
  date: string;
  startTime: string;
  endTime: string;
  additionalInfo: string;
  status: string;
  outcome: string;
  // skillID: number;
  //confirmed: number;
  constructor(
    interviewerIds: number[],
    //organiserId: number,
    // applicantId: number,
    //roleApplied: number,
    date: string,
    startTime: string,
    endTime: string,
    //confirmed: number
    // skillID: number
    additionalInfo: string,
    status: string,
    outcome: string
  ) {
    this.interviewerIds = interviewerIds;
    //this.organiserId = organiserId;
    // this.applicantId = applicantId;
    //this.roleApplied = roleApplied;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    //this.confirmed =confirmed;
    // this.skillID = skillID;
    this.additionalInfo = additionalInfo;
    this.status = status;
    this.outcome = outcome;
  }
}

export class InterviewReturn implements Data {
  interviewId: number;
  interviewers: string[];
  date: string;
  startTime: string;
  endTime: string;
  additionalInfo?: string;
  status?: string;
  outcome?: string;
  organiser?: string;
  constructor(
    interviewId: number,
    interviewers: string[],
    date: string,
    startTime: string,
    endTime: string,
    additionalInfo: string,
    status: string,
    outcome: string,
    organiser: string
  ) {
    this.interviewId = interviewId;
    this.interviewers = interviewers;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.additionalInfo = additionalInfo;
    this.status = status;
    this.outcome = outcome;
    this.organiser = organiser;
  }
}

export class SkillReturn implements Data {}

export class SkillOptions implements Data {
  skillNames: Set<string>;
  skillLevels: Set<string>;

  constructor(names: Set<string>, levels: Set<string>) {
    this.skillNames = names;
    this.skillLevels = levels;
  }
}

export class AppRoles implements Data {
  id: number;
  description: string;
  name: string;

  constructor(id: number, description: string, name: string) {
    this.id = id;
    this.description = description;
    this.name = name;
  }
}
const admin: AppRoles = {
  id: 1,
  description: 'ADMINISTRATOR',
  name: 'ADMIN',
};
const user: AppRoles = {
  id: 2,
  description: 'EMPLOYEE/INTERVIEWER',
  name: 'USER',
};
const recruiter: AppRoles = {
  id: 3,
  description: 'RECRUITER',
  name: 'RECRUITER',
};

export const allRoles: Map<string, AppRoles> = new Map([
  ['ADMIN', admin],
  ['USER', user],
  ['RECRUITER', recruiter],
]);
