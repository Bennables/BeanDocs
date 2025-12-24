import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import type { NextFunction, Request, Response }  from 'express';
import { JwtPayload } from 'jsonwebtoken';

dotenv.config();

const jwtSecret = `${process.env.JWT_SECRET_KEY}`


const makeToken = (req: Request, res: Response) =>{
  const token = jwt.sign({user: req.body.user}, jwtSecret/*, {look at docs}*/)
  return token;
}



interface CustomJwtPayload extends JwtPayload {
  user: string; // or your user type
}


const auth = (req :Request , res: Response, next: NextFunction) => {
    try{
        if (!req.headers['authorization']){
            throw "OOPS";
        }
        else{
            const token = req.headers['authorization'].split(' ')[1]
            const jwtVerified = jwt.verify(`${token}`, jwtSecret) as CustomJwtPayload;
            req.body.user = jwtVerified.user;
        }
    }
  

  catch{
    
  }

  next();
}