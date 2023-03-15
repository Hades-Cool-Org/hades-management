import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try{
    const data = await axios.post("http://localhost:3333/login", {
    email: req.body.email,
    password: req.body.password,
  }).then((t)=>console.log('t',t));
  return res.status(200).json(data)
  }catch (error:any) {  
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}
