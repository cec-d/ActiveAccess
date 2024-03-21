// Import necessary modules
const mongoose = require('mongoose');
const Class = require('./models/Class');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');

  // Define an array of classes
  const classes = [
    {
      title: 'Yoga Class',
      description: 'Join us for a relaxing yoga session.',
      instructor: 'John Doe',
      schedule: 'Monday, Wednesday, Friday at 9:00 AM'
    },
    {
      title: 'Zumba Fitness',
      description: 'Get your groove on with our high-energy Zumba classes.',
      instructor: 'Jane Smith',
      schedule: 'Tuesday and Thursday at 6:00 PM'
    },
    {
      title: 'CrossFit Workout',
      description: 'Experience an intense full-body workout with CrossFit.',
      instructor: 'Mike Johnson',
      schedule: 'Monday to Friday at 7:00 AM'
    },
    {
      title: 'Pilates Session',
      description: 'Strengthen your core and improve flexibility with Pilates.',
      instructor: 'Sarah Lee',
      schedule: 'Tuesday and Thursday at 10:00 AM'
    },
    {
      title: 'Spinning Class',
      description: 'Burn calories and build endurance in our Spinning classes.',
      instructor: 'David Brown',
      schedule: 'Monday, Wednesday, Friday at 6:00 PM'
    },
    {
      title: 'Boxing Fitness',
      description: 'Train like a boxer and improve your strength and agility.',
      instructor: 'Emily Jones',
      schedule: 'Monday and Thursday at 5:30 PM'
    },
    {
      title: 'Boot Camp',
      description: 'Challenge yourself with our intense Boot Camp workouts.',
      instructor: 'Alex Rodriguez',
      schedule: 'Tuesday and Friday at 6:30 AM'
    },
    {
      title: 'Barre Class',
      description: 'Sculpt and tone your body with our Barre workouts.',
      instructor: 'Sophia White',
      schedule: 'Wednesday and Saturday at 10:00 AM'
    },
    {
      title: 'HIIT Training',
      description: 'Get a high-intensity interval training workout with our HIIT classes.',
      instructor: 'Michael Davis',
      schedule: 'Monday to Friday at 6:30 PM'
    },
    {
      title: 'Aqua Aerobics',
      description: 'Work out in the water and improve cardiovascular fitness.',
      instructor: 'Jessica Green',
      schedule: 'Monday and Wednesday at 10:00 AM'
    },

];
  // Insert classes into the database
  Class.insertMany(classes)
    .then(() => {
      console.log('Classes inserted successfully');
      // Disconnect from MongoDB after insertion
      mongoose.disconnect();
    })
    .catch(error => {
      console.error('Error inserting classes:', error);
      // Disconnect from MongoDB on error
      mongoose.disconnect();
    });
})
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
});