import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as types from './types';

describe('model classes pass init test', () => {
  let skillIdOnly: types.skillIdOnly;
  let statusUpdate: types.StatusUpdate;
  let userData: types.UserData;
  let Skills: types.Skills;
  let available: types.Available;
  let applicant: types.applicant;
  let availabilityForInterviews: types.AvailabilityForInterviews;
  let availability: types.Availability;
  let availabilityRange: types.AvailabilityRange;
  let interviewRange: types.InterviewRange;
  let interview: types.Interview;
  let interviewReturn: types.InterviewReturn;
  let SkillOptions: types.SkillOptions;
  let AppRoles: types.AppRoles;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
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
      ],
    });
    skillIdOnly = new types.skillIdOnly(10);
    statusUpdate = new types.StatusUpdate(10, 'Confirmed');
    userData = new types.UserData(
      10,
      'name',
      'password',
      'test@email.com',
      '08001000100',
      'username',
      'business title',
      'account',
      'business unit',
      'join date',
      'designation',
      'location',
      'apriori',
      [new types.AppRoles(10, 'desc', 'name')]
    );
    Skills = new types.Skills(10, 'name', 'level');
    available = new types.Available('date1', 'time1', 'time2', [1, 2, 3]);
    applicant = new types.applicant('name', 'name2', 'email', '08001000100', 1);
    availabilityForInterviews = new types.AvailabilityForInterviews(
      'interviewer',
      0,
      0,
      'date',
      'time1',
      'time2'
    );
    availability = new types.Availability(10, 'date', 'time1', 'time2');
    availabilityRange = new types.AvailabilityRange(
      'date1',
      'date2',
      'time1',
      'time2'
    );
    interviewRange = new types.InterviewRange(
      'date1',
      'date2',
      'time1',
      'time2',
      [0, 1, 2]
    );
    interview = new types.Interview(
      [10, 7, 2],
      'date1',
      'time1',
      'time2',
      'additional',
      'pending',
      'pending'
    );
    interviewReturn = new types.InterviewReturn(
      10,
      ['me', 'you', 'them'],
      'date1',
      'time1',
      'time2',
      'additional',
      'status',
      'outcome',
      'organizer'
    );
    SkillOptions = new types.SkillOptions(
      <Set<string>>(<unknown>['skill1', 'skill2', 'skill3']),
      <Set<string>>(<unknown>['level1', 'level2', 'level3'])
    );
    AppRoles = new types.AppRoles(10, 'desc', 'name');
  });

  it('skillIdOnly should be created', () => {
    expect(skillIdOnly).toBeTruthy();
  });

  it('statusUpdate should be created', () => {
    expect(statusUpdate).toBeTruthy();
  });

  it('userData should be created', () => {
    expect(userData).toBeTruthy();
  });

  it('Skills should be created', () => {
    expect(Skills).toBeTruthy();
  });

  it('available should be created', () => {
    expect(available).toBeTruthy();
  });

  it('applicant should be created', () => {
    expect(applicant).toBeTruthy();
  });

  it('availabilityForInterviews should be created', () => {
    expect(availabilityForInterviews).toBeTruthy();
  });

  it('availability should be created', () => {
    expect(availability).toBeTruthy();
  });

  it('availabilityRange should be created', () => {
    expect(availabilityRange).toBeTruthy();
  });

  it('interviewRange should be created', () => {
    expect(interviewRange).toBeTruthy();
  });

  it('interview should be created', () => {
    expect(interview).toBeTruthy();
  });

  it('interviewReturn should be created', () => {
    expect(interviewReturn).toBeTruthy();
  });

  it('SkillOptions should be created', () => {
    expect(SkillOptions).toBeTruthy();
  });

  it('AppRoles should be created', () => {
    expect(AppRoles).toBeTruthy();
  });
});
