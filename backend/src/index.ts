import express from "express";
import type { Request, Response }  from 'express';
import cors from "cors";
import * as dotenv from "dotenv";
// import db from "./prisma";

// Load environment variables
dotenv.config();
const app = express();

// Enable CORS for development
app.use(cors());

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('GETTING FROM THE MAIN URL');
  console.log("THAT's the number we got")
});

app.post('/', (req: Request, res: Response) => {
  res.send("POSTING TO THE MAIN URL")
  console.log("THAT's the number we got")
})

app.put('/', (req: Request, res: Response) => {
  res.send("PUTTING TO THE MAIN URL");
  console.log("THAT's the number we got");
})

app.delete('/', (req: Request, res: Response) => {
  res.send("DELETING ON THE MAIN URL")
  console.log("THAT's the number we got")
})


// app.get("/:id", async (req: Request, res: Response) =>{
//   console.log(req.params.id);
//   console.log("THAT's the number we got")

// //   let doc: JSON = await db.user.findMany();
// //   console.log(doc);
// //   res.send(doc);
// })


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
