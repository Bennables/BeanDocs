import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import db from "./prisma.config";
// Load environment variables
dotenv.config();
const app = express();
// Enable CORS for development
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('GETTING FROM THE MAIN URL');
    console.log("THAT's the number we got");
});
app.post('/', (req, res) => {
    res.send("POSTING TO THE MAIN URL");
    console.log("THAT's the number we got");
});
app.put('/', (req, res) => {
    res.send("PUTTING TO THE MAIN URL");
    console.log("THAT's the number we got");
});
app.delete('/', (req, res) => {
    res.send("DELETING ON THE MAIN URL");
    console.log("THAT's the number we got");
});
app.get("/:id", async (req, res) => {
    console.log(req.params.id);
    console.log("THAT's the number we got");
    let doc = await db.user.findMany();
    console.log(doc);
    res.send(doc);
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
