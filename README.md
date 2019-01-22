# customers-app

App to add, edit and remove customers.

Implemented using React, React-Router, Webpack, MaterialUI, Express and tested with Jest and Enzyme.

The app reads and writes customer data to a local file.

To run cd into the main directory and npm install then npm start to start the express server. cd src, then npm install - npm start to run the react application.

Available routes are: 
- 'localhost:8080/' to display all users and delete a user
- 'localhost:8080/{userID}' to display and edit a single user
- 'localhost:8080/create' to create a new user

There is a known issue where inputting a blank date field into the customer last contact field will save an invalid date.
