const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cu9mlf8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// ===================================================
// 🔐 JWT Verification Middleware
// ===================================================
const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' });
  }

  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: true, message: 'unauthorized access' });
    }
    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    await client.connect();

    // Database & Collections Setup
    const db = client.db('mediQueueDB');
    const tutorsCollection = db.collection('tutors');
    const bookingsCollection = db.collection('bookings');

    console.log("Successfully connected to MongoDB!");

    // ===================================================
    // 🔑 AUTHENTICATION & JWT ENDPOINT
    // ===================================================
    app.post('/jwt', async (req, res) => {
      const user = req.body; // { email: "user@example.com" }
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
      res.send({ token });
    });

    // ===================================================
    // 📚 TUTORS API ENDPOINTS
    // ===================================================

    // 1. Get Top 6 Tutors for Home Page
    app.get('/tutors/featured', async (req, res) => {
      try {
        const result = await tutorsCollection.find().limit(6).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // 2. Get All Tutors (with Search by Name & Date Filter)
    app.get('/tutors', async (req, res) => {
      try {
        const { search, startDate, endDate } = req.query;
        let query = {};

        // Case-insensitive Search by Tutor Name using $regex
        if (search) {
          query.name = { $regex: search, $options: 'i' };
        }

        // Date Range Filtering using $gte and $lte
        if (startDate || endDate) {
          query.sessionStartDate = {};
          if (startDate) query.sessionStartDate.$gte = startDate;
          if (endDate) query.sessionStartDate.$lte = endDate;
        }

        const result = await tutorsCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // 3. Get Single Tutor Details by ID (Private)
    app.get('/tutors/:id', verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await tutorsCollection.findOne(query);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // 4. Get My Added Tutors by User Email (Private)
    app.get('/my-tutors', verifyToken, async (req, res) => {
      try {
        const email = req.query.email;
        if (req.decoded.email !== email) {
          return res.status(403).send({ error: true, message: 'forbidden access' });
        }
        const query = { userEmail: email };
        const result = await tutorsCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // 5. Add a New Tutor (Private)
    app.post('/tutors', verifyToken, async (req, res) => {
      try {
        const newTutor = req.body;
        // Ensure totalSlot is stored as a number
        newTutor.totalSlot = parseInt(newTutor.totalSlot);
        const result = await tutorsCollection.insertOne(newTutor);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // 6. Update Tutor Details (Private)
    app.put('/tutors/:id', verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedTutor = req.body;
        const option = { upsert: true };
        
        const tutorData = {
          $set: {
            name: updatedTutor.name,
            photo: updatedTutor.photo,
            subject: updatedTutor.subject,
            availableDays: updatedTutor.availableDays,
            timeSlot: updatedTutor.timeSlot,
            hourlyFee: updatedTutor.hourlyFee,
            totalSlot: parseInt(updatedTutor.totalSlot),
            sessionStartDate: updatedTutor.sessionStartDate,
            institution: updatedTutor.institution,
            experience: updatedTutor.experience,
            location: updatedTutor.location,
            teachingMode: updatedTutor.teachingMode,
          }
        };

        const result = await tutorsCollection.updateOne(filter, tutorData, option);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // 7. Delete a Tutor (Private)
    app.delete('/tutors/:id', verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await tutorsCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // ===================================================
    // 📅 BOOKINGS API ENDPOINTS
    // ===================================================

    // 1. Create Booking & Auto-decrease Total Slot (Private)
    app.post('/bookings', verifyToken, async (req, res) => {
      try {
        const bookingData = req.body; // { tutorId, tutorName, studentName, studentEmail, phone, status: "booked" }
        
        // Save Booking
        const bookingResult = await bookingsCollection.insertOne(bookingData);

        // Auto decrease totalSlot by 1 in tutorsCollection
        const tutorFilter = { _id: new ObjectId(bookingData.tutorId) };
        const updateDoc = {
          $inc: { totalSlot: -1 }
        };
        await tutorsCollection.updateOne(tutorFilter, updateDoc);

        res.send(bookingResult);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // 2. Get My Booked Sessions (Private)
    app.get('/my-bookings', verifyToken, async (req, res) => {
      try {
        const email = req.query.email;
        if (req.decoded.email !== email) {
          return res.status(403).send({ error: true, message: 'forbidden access' });
        }
        const query = { studentEmail: email };
        const result = await bookingsCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // 3. Cancel Booking Status to 'cancelled' (Private)
    app.patch('/bookings/cancel/:id', verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: { status: 'cancelled' }
        };
        const result = await bookingsCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}
run().catch(console.dir);

// Root Route
app.get('/', (req, res) => {
  res.send('MediQueue Server is running smoothly!');
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});