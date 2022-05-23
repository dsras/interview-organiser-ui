import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as types from './types';

describe('model classes pass init test', () => {
    let skillIdOnly: types.skillIdOnly;
    let statusUpdate: types.statusUpdate;
    let userData: types.userData;
    let Skills: types.Skills;
    let available: types.available;
    let applicant: types.applicant;
    let availabilityForInterviews: types.availabilityForInterviews;
    let availability: types.availability;
    let availabilityRange: types.availabilityRange;
    let interviewRange: types.interviewRange;
    let interview: types.interview;
    let interviewReturn: types.interviewReturn;
    let SkillOptions: types.SkillOptions;
    let AppRoles: types.AppRoles;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
        ],
        providers: [
          // types.skillIdOnly,
          // types.statusUpdate,
          // types.userData,
          // types.Skills,
          // types.available,
          // types.applicant,
          // types.availabilityForInterviews,
          // types.availability,
          // types.availabilityRange,
          // types.interviewRange,
          // types.interview,
          // types.interviewReturn,
          // types.Skills,
          // types.SkillOptions,
          // types.AppRoles,

        ]
    });
    skillIdOnly = new types.skillIdOnly(10);
    statusUpdate = new types.statusUpdate(10, 'Confirmed');
    userData = new types.userData(10, 'name', 'password', 'test@email.com', '08001000100', 'username', 'business title', 'account', 'business unit', 'join date', 'designation', 'location', 'apriori', [new types.AppRoles(10, 'desc', 'name')]);
    Skills = new types.Skills(10, 'name', 'level');
    available = new types.available('date1', 'time1', 'time2', [1,2,3]);
    applicant = new types.applicant('name', 'name2', 'email', '08001000100', 1);
    availabilityForInterviews = new types.availabilityForInterviews('interviewer', 0, 0, 'date', 'time1', 'time2');
    availability = new types.availability(10, 'date', 'time1', 'time2');
    availabilityRange = new types.availabilityRange('date1', 'date2', 'time1', 'time2');
    interviewRange = new types.interviewRange('date1', 'date2', 'time1', 'time2', [0,1,2]);
    interview = new types.interview([10,7,2], 'date1', 'time1', 'time2', 'additional');
    interviewReturn = new types.interviewReturn(10, ['me','you','them'], 'date1', 'time1', 'time2', 'additional', 'status', 'outcome');
    SkillOptions = new types.SkillOptions((<Set<string>><unknown>['skill1', 'skill2', 'skill3']), (<Set<string>><unknown>['level1', 'level2', 'level3']));
    AppRoles = new types.AppRoles(10, 'desc', 'name');
  });

  it('skillIdOnly should be created', () => {
    expect(skillIdOnly).toBeTruthy();
  });

  it('skillIdOnly should be created', () => {
    expect(statusUpdate).toBeTruthy();
  });

  it('skillIdOnly should be created', () => {
    expect(userData).toBeTruthy();
  });

  it('skillIdOnly should be created', () => {
    expect(Skills).toBeTruthy();
  });

  it('skillIdOnly should be created', () => {
    expect(available).toBeTruthy();
  });

  it('skillIdOnly should be created', () => {
    expect(applicant).toBeTruthy();
  });

  it('skillIdOnly should be created', () => {
    expect(availabilityForInterviews).toBeTruthy();
  });

  it('skillIdOnly should be created', () => {
    expect(availability).toBeTruthy();
  });

  it('skillIdOnly should be created', () => {
    expect(availabilityRange).toBeTruthy();
  });

  it('skillIdOnly should be created', () => {
    expect(interviewRange).toBeTruthy();
  });

  it('skillIdOnly should be created', () => {
    expect(interview).toBeTruthy();
  });

  it('skillIdOnly should be created', () => {
    expect(interviewReturn).toBeTruthy();
  });

  it('skillIdOnly should be created', () => {
    expect(SkillOptions).toBeTruthy();
  });

  it('skillIdOnly should be created', () => {
    expect(AppRoles).toBeTruthy();
  });

});


