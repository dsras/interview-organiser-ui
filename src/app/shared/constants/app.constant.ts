export const prodEnv = false;

class API_CONSTANTS {
  ENV: string = prodEnv ? 'PROD' : 'DEV';
  BASE_URL: string = prodEnv
    ? 'http://ec2-18-141-205-66.ap-southeast-1.compute.amazonaws.com:8080/'
    : 'http://localhost:8080/';
  LOGIN: string = 'users/authenticate';
  USER: string = 'users'; 
  USER_FIND: string = 'users/findUser';

  AVAIL: string = 'availability';
  AVAIL_REC: string = 'availability/recruiter';
  AVAIL_REC_RANGE: string = 'availabilityRange/';
  AVAIL_DEL: string = 'availability/delete';
  AVAIL_RANGE: string = 'availability/username/range';
  AVAIL_ADD: string = 'availability/new';
  AVAIL_GET: string = 'availability/find';
  AVAIL_SKILL: string = 'availability/findBySkills?ids=';
  AVAIL_ALL: string = 'availability/findAll';
  AVAIL_FILTER: string = 'users/findInterviewers';

  STATUS_UPDATE: string = 'interviews/updateStatus';
  OUTCOME_UPDATE: string = 'interviews/updateOutcome';

  APPLICANT_ADD: string = 'applicants/new';
  APPLICANT_ALL: string = 'applicants/findAll';

  INTER: string = 'interviews';
  INTER_DELETE: string = 'interviews/delete';
  INTER_INTER_RANGE: string = 'interviews/range/username';
  INTER_COMP: string = 'interviews/username/completed';
  INTER_CONF: string = 'interviews/username/status/confirmed'
  INTER_PNS: string = 'interviews/username/status/panel-no-show'
  INTER_CNS: string = 'interviews/username/status/candidate-no-show'
  INTER_PROG: string = 'interviews/username/status/progressed'
  INTER_NOPROG: string = 'interviews/username/status/not-progressed'
  INTER_HIRE: string = 'interviews/username/status/hired'
  INTER_INTER: string = 'interviews/interviewers'
  INTER_INTER_ACC: string = 'interviews/interviewersAccurate'

  INTER_ADD: string = 'interviews/new';
  INTER_BY_INT: string = 'interviews/findByInterviewer';
  INTER_BY_REC: string = 'interviews/organiser';
  INTER_ALL: string = 'interviews/findAll';

  ROLES_GET: string = 'users/username/roles';
  SKILLS: string = 'user-skills';
  SKILLS_GET: string = 'users/findSkills';
  SKILLS_ADD: string = 'users/addSkill';
  SKILLS_GET_ALL: string = 'skills/findAll';
}

class DATA_SOURCE_CONSTANTS {
  ROUTE: string = 'route';
}

class LOGIN_CONSTANTS {
  LOGIN_TYPE_MANUAL: string = 'conventional';
  LOGIN_TYPE_SSO: string = 'social';
}

class COMMON_CONSTANTS {
  AMBER: string = 'amber';
  GREEN: string = 'green';
  RED: string = 'red';
  INFO: string = 'info';
  PRIMARY: string = 'primary';
}

class CSS_CONSTANTS {
  BG_WARNING: string = 'bg-warning';
  BG_SUCCESS: string = 'bg-success';
  BG_RED: string = 'bg-danger';
  BG_INFO: string = 'bg-info';
  BG_PRIMARY: string = 'bg-primary';
}

class SSOCONSTANTS {
  //61469011957-3mb05n2d9sgk20l4tqeu8crao3klq781.apps.googleusercontent.com

  //CLIENT_ID_PROD: string = '575804833966-mvu3im6bd5t0etevag351l4ep5accc6n.apps.googleusercontent.com';
  CLIENT_ID_PROD: string =
    '61469011957-hah5f0jktnj1l7nim4i2v8i363qua2rs.apps.googleusercontent.com';
  //CLIENT_ID_DEV: string = "879459911972-115u5kpqekutrm3vp8sjp8ebdb8idhu2.apps.googleusercontent.com"
  CLIENT_ID_DEV: string =
    '61469011957-hah5f0jktnj1l7nim4i2v8i363qua2rs.apps.googleusercontent.com';
}
export class APPCONSTANTS {
  static readonly APICONSTANTS = new API_CONSTANTS();
  static readonly DATA_SOURCE_CONSTANTS = new DATA_SOURCE_CONSTANTS();
  static readonly LOGIN_CONSTANTS = new LOGIN_CONSTANTS();
  static readonly COMMON_CONSTANTS = new COMMON_CONSTANTS();
  static readonly CSS_CONSTANTS = new CSS_CONSTANTS();
  static readonly SSO_CONSTANTS = new SSOCONSTANTS();
}

export class EXPORT {
  static readonly EXCEL_TYPE: string =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  static readonly EXCEL_EXTENSION: string = '.xlsx';
  static readonly EXCEL_FILE_NAME: string = 'sample';
}
