## EventTracker

### Job tracking database

The Event Tracker, JobHunt, application is designed to help a user keep track of jobs while conducting a job search. JobHunt tracks the pertinent Job details, associated contact information, and details of the parent company that is advertising the job.  This first version of the project includes two of the initial table entities - Job and Company.  Future versions of JobHunt will incorporate additional functionality, such as a frontend.

### Technologies Used

Java version 1.8, Spring Boot, MySQL Workbench, Spring Tool Suite, Atom, Postman, JPA, Github, AWS EC2,


The POSTMAN file is included with test routes.

### First Draft of Entity Diagram

As you can see Entity Diagram, there is a one to many relationship between Company and Job. One Company can have more than one job, while each individual instanct of a Job is associated with only one company.

![Alt text](https://github.com/Eagle-Fang/EventTrackerProject/blob/main/DB/erdiagram.png)



### Expected Route
The Postman routes file is included with the source code.  It can be imported into Postman.   

![Alt text](https://github.com/Eagle-Fang/EventTrackerProject/blob/main/Postman/RoutesTable.png)
