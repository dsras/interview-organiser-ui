# API endpoints

Need to expose endpoints for our Java middleware API, so that the Angular UI set up can connect with it:

## User:

### logIn

- When: user wishes to login to app
- Input: user credentials
- Output: users home screen
- Action: user is authenticated and logged in

### logOut

- When: user wishes to log out or exceeds period of inactivity
- Input: UI input or token authentication period expires
- Output:
- Action: User is logged out and redirected to login page

### register

- When: new user wishes to create an account
- Input: user credentials
- Output:
- Action: new user account created

## Interviewer:

### addSkill

- Called when: interviewer adds a skill to their profile
- Input: skill & level
- Output: updated list of interviewer skills
- Action: add new skill to skill list & corresponding level to interviewer object, changes reflected in ui

### updateSkill

- Called when: interviewer updates their level for a skill
- Input: skill & level
- Output: updated skill added to list of interviewer skills
- Action: update skill level in interviewer object, changes reflected in UI

### viewSkills

- Called when: interviewer views their skill profile page
- Input: interviewer
- Output: Profile page returned to view a summary of interviewers skills
- Action: UI displays representation of skill set

### removeSkill

- Called when: interviewer removes a skill from skill set
- Input: interviewer, skill
- Output:
- Action: skill is removed from interviewer skill set

### addAvailability

- Called when: interviewer wishes to add a period of availability
- Input: the interviewer, a block/slot of time to be made available
- Output: UI updated with added availability displayed
- Action: interviewer availability is updated and can be searched for to fill panel for an interview when searched

### viewAvailability

- Called when: interviewer wishes to see all of their availability
- Input: interviewer
- Output: interviewer monthly/weekly availability
- Action: UI displays the calendar of the interviewer for a month

### updateAvailabilty

*see updateSkill*

### removeAvailability

*see removeSkill*

### Recruiter:

### createInterview

- Called when: recruiter selects slot to create an interview
- Input: slot, interview panel (interviewer(s), maybe info e.g., candidate name, cv attachment (assuming only interviewer & recruiter have access to this slot information) and meeting link/details
- Output: blocked calendar for the interviewer and applicant with the interview information
- Action: interview is created, interviewers() chosen for this interviewer become unavailable, interviewer notified and calendar updated

### updateBooking

- Called when: recruiter updates/creates an interview
- Input: time slot, applicant, skill level, interviewer(s)
- Output: Updated interview object
- Action: Some kind of flag system or similar to send only pertinent info to the booking.

### returnInterviewersOverview

- Called when: recruiter wants overview of all interviews complete
- Input: time period maybe?
- Output: number of interviews performed by interviwers
- Action: returns the general overview of number of interviews

## Interview:

### searchForSkillSet

- Called when: recruiter has a candidate to interview and needs to find and fill a skillset on the interview panel
- Input: Skill set required for interview panel, DateTime Range eg. 14/03/2022 - 10:00AM → 14/03/2022 - 16:00PM
- Output: returns potential start times with suitable available recruiter(s) for the panel
- Action: times displayed to recruiter UI

### confirmInterview

- Called when: interviewer  confirms interview has taken place
- Input:
- Output:
- Action: interviewers *interviewsCompleted* attribute (or similar) is updated