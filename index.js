const express = require('express');
const mongoose = require('mongoose');

// Initialize the app
const app = express();

// MongoDB connection URL
const mongoURI = 'mongodb+srv://sakthiadhavank21eie:0sTwBbJuhr0Ilwyp@cluster0.cqnar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Define the schema
const personSchema = new mongoose.Schema({
  personfound: {
    type: Boolean,
    default: false,
  },
});

// Create the model
const Person = mongoose.model('Person', personSchema);

// Route to check if a person is found or not
app.get('/find-person', async (req, res) => {
  try {
    // Search for a person where 'personfound' is true
    const foundPerson = await Person.findOne({ personfound: true });

    // If a person is found, return 'found', otherwise 'not found'
    if (foundPerson) {
      res.json({ message: 'Person found' });
    } else {
      res.json({ message: 'Person not found' });
    }
  } catch (error) {
    // Return a 500 error response if something goes wrong
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update the personfound field
app.post('/update-data', async (req, res) => {
  try {
    // Search for a person (this example updates the first document it finds)
    const person = await Person.findOne();

    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    // Toggle the personfound value (true -> false, false -> true)
    person.personfound = !person.personfound;

    // Save the updated person document
    await person.save();

    res.json({
      message: 'Personfound status updated',
      updatedPerson: person,
    });
  } catch (error) {
    // Return a 500 error response if something goes wrong
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to set the personfound field to false
app.post('/set-false', async (req, res) => {
    try {
      // Search for a person (this example updates the first document it finds)
      const person = await Person.findOne();
  
      if (!person) {
        return res.status(404).json({ message: 'Person not found' });
      }
  
      // Set personfound to false
      person.personfound = false;
  
      // Save the updated person document
      await person.save();
  
      res.json({
        message: 'Personfound set to false',
        updatedPerson: person,
      });
    } catch (error) {
      // Return a 500 error response if something goes wrong
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
