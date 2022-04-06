# JSON Schemas

## USER

### POST request: add new user

(can have any attributes that are also in response but the 5 in request body example here are required)

**/users/new**

Request body:

{

“userName” : “Slim Bond”,

“username” : “slim-bond”,

“userpassword” : “123”,

“userEmail” : “slim@gmail.com”,

“businessTitle” : “Spy”

}

Response body (just sends object back): 

{

**“username” : “username”**

**“userpassword” : “password”,**

**“userEmail” : “email”,**

“userMobile” : 012345678910,

**“userName” : “name”,**

**“businessTitle” : “business title”,**

“account” : “account”,

“businessUnit” : “business unit”,

“dateOfJoining” : “yyyy-MM-dd” (presumably, yet to test - java type is Instant),

“designation” : “designation”,

“location” : “location”,

“priorExperience” : 2

}

### GET request: get user by username

**/user?username=slim-bond**

Response body:

{

**“username” : “slim-bond”,**

**“userpassword” : “123”,**

**“userEmail” : “slim@gmail.com”,**

“userMobile” : 012345678910,

**“userName” : “Slim Bond”,**

**“businessTitle” : “Spy”**

“account” : “account”,

“businessUnit” : “business unit”,

“dateOfJoining” : “yyyy-MM-dd” (presumably, yet to test - java type is Instant),

“designation” : “designation”,

“location” : “location”,

“priorExperience” : 2

}

### POST request: interviewers with required skills available for time interval on certain date

**/users/available**

Request body:

{

"date":"2022-04-04",
"start_time":"09:00",
"end_time":"10:00",
"skills": [1,2]

}

Response body:

still working on query for this, intend response body to be:

[ ]

but currently the response is this (just sends the object back):

{

"date":"2022-04-04",
"start_time":"09:00",
"end_time":"10:00",
"skills": [1,2]

}

## APPLICANT

### POST request: add new interview applicant

**/applicants/new**

Request body:

{

“firstName” : “Anna”,

“lastName” : “Brown”,

“email” : “ab@gmail.com”

}

Response body (just sends object back):

{

“id": 5,

"firstName": "Anna",

"lastName": "Brown",

"email": "ab@gmail.com",

"mobile": **null**

}

## AVAILABILITY

### POST request: add new interviewer availability

**/availability/new**

Request body:

{

“userId” : 1,

“date” : “yyyy-MM-dd”,

“start_time” : “09:00”,

“end_time” : “10:00”

}

Response body:

{

“userId” : 1,

“date” : “yyyy-MM-dd”,

“start_time” : “09:00”,

“end_time” : “10:00”

}

## INTERVIEW

### POST request: add new interview

**interviews/new**

Request body:

{
   "interviewerId" : 1,
   "organiserId" : 2,
   "applicantId" : 1,
   "roleApplied" : 1,
   "interviewDate" : "04-04-2022",
   "timeStart" : "09:00",
   "timeEnd" : "10:00",
   "confirmed" : 0
}

Response body (just sends object back):

{

“interviewId” : 101,

"interviewerId" : 1,

"organiserId" : 2,

"applicantId" : 1,

“roleApplied" : 1,

"interviewDate" : "04-04-2022",

"timeStart" : "09:00",

"timeEnd" : "10:00",

"confirmed" : 0

}

### GET request: get interview by ID

**interviews/interview?id=101**

Response body :

issues with date and time so at the moment doesn’t work but intend response to be:

{

“interviewId” : 101,

"interviewerId" : 1,

"organiserId" : 2,

"applicantId" : 1,

“roleApplied" : 1,

"interviewDate" : "04-04-2022",

"timeStart" : "09:00",

"timeEnd" : "10:00",

"confirmed" : 0

}

## ROLE

### POST request: add new role

roles/new

Request body:

{

“roleName” : “Software Engineer”,

“description” : “Full stack developer”

}

Response body (just sends object back):

{

“roleId” : 3,

“roleName” : “Software Engineer”,

“description” : “Full stack developer”

}