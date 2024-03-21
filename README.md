ActivAccess App

Welcome to the ActivAccess App! This project allows users to browse fitness classes and book them.

Features
User Authentication: Users can sign up, log in, and log out securely.
Browse Classes: Users can view available fitness classes with details like title, instructor, and schedule.
Book Classes: Logged-in users can book classes to attend.
Dashboard: Users can see their booked classes on the dashboard.
Remove Classes: Users can remove booked classes from their schedule.
Prerequisites
Before running this project, make sure you have the following installed:

Node.js
npm (Node Package Manager)
MongoDB

Installation

Clone the repository to your local machine:

git clone 
Navigate to the project directory:

cd fitness-class-booking-app
Install dependencies:

npm install

Make sure MongoDB is running on your machine

Configure environment variables:

Create a file named '.env' in the project root directory.
Add the following environment variables to the .env file:

MONGODB_URI=mongodb://localhost:27017/
SECRET_KEY=test1234

Add Test Classes to your database using the insertClasses.js file provided
node insertClasses.js

Start the server:
node server.js

Start React Dev:
npm start
Open your web browser and go to http://localhost:3000 to access the application.


Sign up for a new account or log in with existing credentials.

Browse available classes, book classes, and view your booked classes on the dashboard.

To log out, click the "Logout" button in the navigation bar.
