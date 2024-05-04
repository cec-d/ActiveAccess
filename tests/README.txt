Running the Tests
To run the tests, you need to have Jest and Supertest installed:


npm install jest supertest --save-dev
npm install mongodb-memory-server --save-dev


Ensure you have the MongoDB test environment set up as needed (e.g., with mongodb-memory-server or a real MongoDB instance).

To run the tests:




npx jest

npx jest path/to/specific-test-file.test.js


Test Scenarios
Test Case: Adding a New Fitness Class
Adds a new fitness class to the schedule.
Test Case: Removing a Class from the Schedule
Allows a user to remove a class from their schedule.
Test Case: Admin Removing a Class from the List
Allows an admin to remove a class from the available classes list.
Test Case: Admin Adding a Class to the List
Allows an admin to add a new class to the available classes list.