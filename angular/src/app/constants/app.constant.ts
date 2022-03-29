export const prodEnv = true;

class API_CONSTANTS {
    ENV: string = (prodEnv) ? 'PROD': 'DEV';
    BASE_URL: string = (prodEnv) ? 'http://ec2-18-141-205-66.ap-southeast-1.compute.amazonaws.com:8080/' : 'http://ec2-18-141-205-66.ap-southeast-1.compute.amazonaws.com:8080/';
    LOGIN: string = 'user/authenticate';
    USER: string = 'user/get';
    POSITIONS: string = 'position/get';
    METADATA: string = 'position/positionmetadata';
    CREATE_POSITION: string = 'position/saveposition';
    UPDATE_POSITION: string = 'position/update';
    MAP_CANDIDATE_TO_POSITION: string = 'position/map';
    MAPPED_CANDIATES_FOR_POSITION: string = 'positionrequirement/candidate/get';
    UPDATE_MAPPED_CANDIDATE: string = 'positionrequirement/update';
    CANDIDATES: string = 'candidate/get';
    UPDATE_CANDIDATE: string = 'candidate/update';
    CREATE_CANDIDATE: string = 'candidate/savecandidate';
    POSITION_AUDIT_TRAIL: string = 'analytics/position';
    CANDIDATE_AUDIT_TRAIL: string = 'analytics/candidate'
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
    BG_PRIMARY: string = 'bg-primary'
}
class STATUS_CONSTANTS {
    INTERVIEW_IN_PROGRESS: string = 'Interview InProgress';
    INTERVIEW_REJECTED: string = 'Interview Rejected';
    INTERVIEW_READY: string = 'Interview Ready';
    INTERVIEW_SELECTED: string = 'Interview Selected';
    OFFER_REJECTED: string = 'Offer Rejected';
    JOINED: string = 'Joined';
    MAPPED: string = 'Mapped';
    DROP_OUT: string = 'Drop Out';
    OFFERED: string = 'Offered';
    CLIENT_INTERVIEW_IN_PROGRESS: string = 'Client Interview InProgress';
    AVAILABLE: string = 'Available';
    YET_TO_BEGIN: string = 'Yet to Begin';
    ONBOARDING: string = 'Onboarding';
    STARTED: string = 'Started';
    ONBOARDING_IN_PROGRESS: string = "Onboarding InProgress";
}

class SSOCONSTANTS {
    //61469011957-3mb05n2d9sgk20l4tqeu8crao3klq781.apps.googleusercontent.com

    //CLIENT_ID_PROD: string = '575804833966-mvu3im6bd5t0etevag351l4ep5accc6n.apps.googleusercontent.com';
    CLIENT_ID_PROD: string = '61469011957-3mb05n2d9sgk20l4tqeu8crao3klq781.apps.googleusercontent.com';
    //CLIENT_ID_DEV: string = "879459911972-115u5kpqekutrm3vp8sjp8ebdb8idhu2.apps.googleusercontent.com"
    CLIENT_ID_DEV: string = "61469011957-3mb05n2d9sgk20l4tqeu8crao3klq781.apps.googleusercontent.com"

}
export class APPCONSTANTS {
    static readonly APICONSTANTS = new API_CONSTANTS();
    static readonly DATA_SOURCE_CONSTANTS = new DATA_SOURCE_CONSTANTS();
    static readonly LOGIN_CONSTANTS = new LOGIN_CONSTANTS();
    static readonly COMMON_CONSTANTS = new COMMON_CONSTANTS();
    static readonly CSS_CONSTANTS = new CSS_CONSTANTS();
    static readonly STATUS_CONSTANTS = new STATUS_CONSTANTS();
    static readonly SSO_CONSTANTS = new SSOCONSTANTS();
}

export class EXPORT {
    static readonly EXCEL_TYPE: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    static readonly EXCEL_EXTENSION: string = '.xlsx';
    static readonly EXCEL_FILE_NAME: string = 'sample';
}