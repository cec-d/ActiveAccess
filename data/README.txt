# Data Collection Script

This script collects data from the application's MongoDB database and saves it into JSON files.

## Prerequisites

Ensure that you have Node.js, npm, and MongoDB installed.

## Setup

1. Clone the repository.
2. Install the necessary dependencies:

   ```bash
   npm install
3. Set the MONGODB_URI environment variable or update the connection string in the collectData.js script.

unning the Data Collection Script
To collect data, run the script using Node.js:

    ```bash
node collectData.js

The collected data will be saved in the following files:

usersData.json: Contains user information.
classesData.json: Contains information about classes.
