import { Observer } from 'rxjs';

export interface data {}
export class skillIdOnly implements data {
  skillId: number;
  constructor(skillId: number) {
    this.skillId = skillId;
  }
}

export class statusUpdate implements data {
  interview_id: number;
  update: string;
  constructor(interview_id: number, update: string) {
    this.interview_id = interview_id;
    this.update = update;
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
  appRoles: Array<AppRoles>;

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
    appRoles: Array<AppRoles>
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
    this.appRoles = appRoles;
  }
}

export class Skills implements data {
  id: number;
  skillName: string;
  skillLevel: string;

  constructor(id: number, skillName: string, skillLevel: string) {
    this.id = id;
    this.skillName = skillName;
    this.skillLevel = skillLevel;
  }
}

export class available implements data {
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

export class applicant implements data {
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
  ) {
    //this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.mobile = mobile;
    this.skillID = skillID;
  }
}

export class availabilityForInterviews implements data {
  interviewer: string;
  interviewer_id: number;
  availability_id: number;
  date: string;
  start_time: string;
  end_time: string;
  constructor(
    interviewer: string,
    interviewer_id: number,
    availability_id: number,
    date: string,
    start_time: string,
    end_time: string
  ) {
    this.interviewer = interviewer;
    this.interviewer_id = interviewer_id;
    this.date = date;
    this.availability_id = availability_id;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}

export class availability implements data {
  availability_id: number;
  date: string;
  start_time: string;
  end_time: string;
  constructor(
    availability_id: number,
    dateStart: string,
    start_time: string,
    end_time: string
  ) {
    this.availability_id = availability_id;
    this.date = dateStart;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}

export class availabilityRange implements data {
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  constructor(
    start_date: string,
    end_date: string,
    start_time: string,
    end_time: string
  ) {
    this.start_date = start_date;
    this.end_date = end_date;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}

export class interviewRange implements data {
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
  ) {
    this.start_date = start_date;
    this.end_date = end_date;
    this.start_time = start_time;
    this.end_time = end_time;
    this.skills = skills;
  }
}

export class interview implements data {
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
    additional_info: string
  ) {
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

export class interviewReturn implements data {
  interview_id: number;
  interviewers: string[];
  date: string;
  start_time: string;
  end_time: string;
  additional_info: string;
  status: string;
  outcome: string;
  constructor(
    interview_id: number,
    interviewers: string[],
    date: string,
    start_time: string,
    end_time: string,
    additional_info: string,
    status: string,
    outcome: string
  ) {
    this.interview_id = interview_id;
    this.interviewers = interviewers;
    this.date = date;
    this.start_time = start_time;
    this.end_time = end_time;
    this.additional_info = additional_info;
    this.status = status;
    this.outcome = outcome;
  }
}

export class SkillOptions implements data {
  skillNames: Set<string>;
  skillLevels: Set<string>;

  constructor(names: Set<string>, levels: Set<string>) {
    this.skillNames = names;
    this.skillLevels = levels;
  }
}

export class AppRoles implements data {
  id: number;
  description: string;
  name: string;

  constructor(id: number, description: string, name: string) {
    this.id = id;
    this.description = description;
    this.name = name;
  }
}
