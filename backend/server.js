import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS for development
app.use(cors());

app.use(express.json());



app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));