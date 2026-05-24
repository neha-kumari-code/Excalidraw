import express from 'express';
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '@repo/backend-common/config'
import { middleware } from './middleware';
const app=express();

app.post("/signup",(req,res)=>{
   //db call
   res.json({
    roomId:"123"
   })
})
app.post('/signin',(req,res)=>{
    try {
        const userId=1;
        const token=jwt.sign({
            userId
        },JWT_SECRET)
    } catch (error) {
        
    }
})
app.post('/room',middleware,(req,res)=>{
    // db call
    res.json({
        roomId:123
    })
})
app.listen(3000,()=>console.log(" server started"))