# API Endpoints

Need to expose endpoints for our Java middleware API, so that the Angular UI set up can connect with it:

## addAvailability

- Called when: interviewer adds availability to slot
- Input: interviewer, assuming called on slot object
- Output: timeslot (Where interviewer(s) is/are available)
- Action: interviewer added as available to slot so searches for interviewer skill levels will return this slot

## bookInterview

- Called when: recruiter selects slot to create an interview
- Input: slot, interview panel (interviewer(s), maybe info e.g., candidate name, cv attachment (assuming only interviewer & recruiter have access to this slot information) and meeting link/details
- Output: blocked calendar for the interviewer and applicant with the interview information
- Action: interview is created, interviewers() chosen for this interviewer become unavailable, interviewer notified and calendar updated

## searchForSkillSet

- Called when: recruiter has a candidate to interview and needs to find/filter slots which hold available interviewers for the given skill set criteria
- Input: Skill set required to test the interviewer, DateTime Range eg. 14/03/2022 - 10:00AM → 14/03/2022 - 16:00PM
- Output: Highlights available timeslots in the calendar
- Action: recruiter chooses the suitable available interviewer

## confirmInterview

- Called when: interviewer (or recruiter?) confirms interview has taken place
- Input: slot
- Output: confirmation emails sent to interviewer and applicant.
- Action: interviewers *hoursInterviewed* attribute (or similar) is updated, entitlement updated (or however the incentive scheme works), changes reflected in ui

## updateBooking

- Called when: recruiter updates/creates an interview
- Input: time slot, applicant, skill level, interviewer(s)
- Output: Updated interview object
- Action: Some kind of flag system or similar to send only pertinent info to the booking.

## addSkill

- Called when: interviewer adds a skill to their profile
- Input: skill & level
- Output: updated list of interviewer skills
- Action: add new skill to skill list & corresponding level to interviewer object, changes reflected in ui

## updateSkillLevel

- Called when: interviewer updates their level for a skill
- Input: skill & level
- Output: updated list of interviewer skills
- Action: update skill level in interviewer object, changes reflected in ui

## filterBySkill

- Called when: recruiter searches for slots for particular skills
- Input: Skillset{}
- Output: List of interviewers with specified skills
- Action: get interview slots for specified skill set, probably links to a view option from mySQL

## approveCandidate -N/A

- Called when: interviewer or recruiter approves candidate
- Input: candidate
- Output:
- Action: moves the interviewee to the successful list/marks the interviewee profile, so that they are known to the system as a successful applicant

## returnSuccessfulApplicants - N/A

- Called when: recruiter wants list of successful candidates
- Input:
- Output: list of candidates
- Action: get list of candidates who passed interview

## returnInterviewersOverview

- Called when: recruiter wants overview of all interviews
- Input: time period maybe?
- Output: number of interviews, success rate
- Action: returns the general overview of number of interviews plus the success/failure rate (or smth similar)

## checkMyInterviews

- Called when: interviewer wishes to see their availability
- Input: interviewer id
- Output: interviewer monthly/weekly schedule
- Action: return the calendar of the interviewer for a month