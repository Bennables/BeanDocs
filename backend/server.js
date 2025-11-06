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
  res.send('GETTING FROM THE MAIN URL');
});

app.post('/', (req, res) => {
  res.send("POSTING TO THE MAIN URL")
})

app.put('/', (req, res) => {
  res.send("PUTTING TO THE MAIN URL")
})

app.delete('/', (req, res) => {
  res.send("DELETING ON THE MAIN URL")
})


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));