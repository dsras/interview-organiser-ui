Problem Statement
Design a web tool for better and efficient operations between Recruitment team and Interview panels across BFS BU

The tool should offer 
All interview panels the flexibility to
Plan their interview slots for next 1 month
View in real time the number of interviews taken and eligible for incentive program
View or change the skill level
Recruitment team to be able to 
Search an interview slot for a particular skill set and utilize it

Actors
Interview Panels
All technical employees across BFS BU eligible to take interviews (B6 and above). The employees provide the interview slots to recruitment team as per their calendar availability. 

Recruitment Team
A dedicated team of talent acquisition who takes care of hiring the right talent in Accolite. The team source candidate profiles and coordinate with Interview Panels to schedule interviews. The team keeps track of all candidate engagement until the candidate joins Accolite.


Technical Design
The web application will be built on three tier architecture involving FrontEnd (browser), Middleware (Java) and database (MySQL). The application will be hosted in AWS cloud infrastructure

Backend
Java based Spring Boot application exposing the functional logic in the form of REST APIs. The data is extremely sensitive and would need APIs to be taking care of authorization and authentication in the most robust way

FrontEnd
Angular 12 based frontend application running on Chrome browser primarily. The application should be designed in better segregated layers. The application should support dynamic layout to have a mobile friendly view as well. 

Database
MySQL database hosted in AWS cloud. The schema will be shared with another application RaFT. Basic table schema design of User, Role etc. will be preexisting and has to be leveraged accordingly.

Deployment
AWS cloud-based deployment. Complete automation pipeline starting from code repository being GitHub and CI/CD pipelines as AWS services. The deployment should be completely automated and should get trigger automatically with code check-in in dev environment.




