## EventTracker

### Job tracking database

This JobHunt event tracker application is designed to help a user keep track of job applications while conducting a job search. JobHunt tracks the pertinent job details, contact information, and parent company associated with each job.  

The first version of the project included two initial table entities - Job and Company build with RESTful API that provided full CRUD capability.  The second iteration of this application includes a front end using javascript.  

### Technologies Used

Java version 1.8, Spring Boot, MySQL Workbench, Spring Tool Suite, Atom, Postman, JPA, Github, AWS EC2,
Javascript.

### First Draft of Entity Diagram

As you can see Entity Diagram, there is a one to many relationship between Company and Job. One Company can have more than one job, while each individual instanct of a Job is associated with only one company.

![Alt text](https://github.com/Eagle-Fang/EventTrackerProject/blob/main/DB/erdiagram.png)



### Expected Route
The Postman routes file is included with the source code.  It can be imported into Postman.   

![Alt text](https://github.com/Eagle-Fang/EventTrackerProject/blob/main/Postman/RoutesTable.png)


### Week 2 Javascript Front End functionality

The form on the main page allows you to list all jobs, search existing jobs, or create a new job entry. When the submit button is pressed to create a new job, a JSON object is created from the provided form field values. Upon successful POST operation, this newly created object is added to the list of jobs.  

You can press the button to display the table of all existing jobs. If a table row is clicked, a detail view for just that one entity is displayed. This was accomplished by by adding a 'click' event listener to each table row.  In the detail view there is a form with option to edit or delete the entity.

You can also search database of existing jobs to find a job with a minimum salary between two values.  The resulting output with show the jobs that meet the provided criteria.
