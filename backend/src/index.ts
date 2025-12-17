import express from "express";
import type { Request, Response }  from 'express';
import cors from "cors";
import * as dotenv from "dotenv";

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.js'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

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
  console.log("THAT's thre number we got");
})

app.delete('/', (req: Request, res: Response) => {
  res.send("DELETING ON THE MAIN URL")
  console.log("THAT's the number we got")
})


app.get("/:id", async (req:Request, res: Response) =>{

  console.log("TRYING TO GET");
  res.status(200).send({"msg": "GET IS GOOD"})


})

app.post("/:id", async (req: Request, res: Response) =>{
  console.log(req.params.id);
  console.log("THAT's the number we got");

  console.log(req.body.data)

  res.status(200).send({"msg": "POST IS GOOD"})

//   let doc: JSON = await db.user.findMany();
//   console.log(doc);
//   res.send(doc);
})

app.get("/:id", async (req: Request, res: Response) => {
  console.log(typeof req.params.id);

  const done = await prisma.user.create({
    data: {
      name: "hello",
      password: "john"
    }

  });
  console.log(done);

  // const file = await prisma.docs.findUnique({
  //   where:{
  //     id:Number(req.params.id),
  //   }
  // })

  res.send(200);
  // res.send(file);
})


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Secrver started on port ${PORT}`));
