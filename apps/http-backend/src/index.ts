import express from 'express';
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '@repo/backend-common/config'
import { middleware } from './middleware';
import {UserSchema,SignInSchema,CreateRoomSchema} from '@repo/common/types'
import { prisma as prismaClient } from '@repo/db/client';
import bcrypt from 'bcrypt'
const app=express();
app.use(express.json());
import "dotenv/config";
app.post("/signup",async(req,res)=>{
    try{
        console.log(req.body);
    const result=UserSchema.safeParse(req.body)
    console.log(result);
    if(!result.success){
        return res.json({
            success:false,
            message:'invalid input'
        })
    }
   //db call
   const salt=await bcrypt.genSalt(10);
   console.log("salt is ",salt);
   const hashedPass=await bcrypt.hash(result.data.password,salt);
   console.log("hashed pass is ",hashedPass);
    const user=await prismaClient.user.create({
        data:{
            name:result.data.name,
            password:hashedPass,
            email:result.data.email
        }
    })
    console.log("user created in db is ",user);
    const token=jwt.sign({
            userId:user.id
        },JWT_SECRET)
   return res.json({
    success:true,
    token
   })
}catch(error){
    console.error("SIGNUP ERROR:", error);
    return res.status(500).json({
        success: false,
        message: 'internal server error'
    });
}
})
app.post('/signin',async(req,res)=>{
    try {
        const result=SignInSchema.safeParse(req.body)
        if(!result.success){
           return res.json({
            success:false,
            message:'invalid input'
        })
        }
        const user=await prismaClient.user.findFirst({
            where:{
                email:result.data.email
            },
            select:{
                email:true,
                name:true,
                id:true,
                password:true
            }
        })
        if(!user){
             return res.json({
            success:false,
            message:'user does not exist'
        })
    }
    const match=await bcrypt.compare(result.data.password,user.password)
    if(!match){
         return res.json({
            success:false,
            message:'password incorrect'
        })
    }
        const token=jwt.sign({
            userId:user.id
        },JWT_SECRET)
     return res.json({
    success:true,
    token
   })
    } catch (error) {
          return res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
})
app.post('/room',middleware,async(req,res)=>{
    try{
     const result=CreateRoomSchema.safeParse(req.body)
        if(!result.success){
           return res.json({
            success:false,
            message:'invalid input'
        })
        }
    // db call
    // @ts-ignore
        const userId=req.userId;
        const room=await prismaClient.room.create({
            data:{
                slug:result.data.name,
            adminId:userId
            }
        })
        return res.json({
        roomId:room.id
    })
    } catch (error) {
        return res.json({
            success:false,
            message:` error in catch block ${error}`
        })
    }
})
app.listen(3001,()=>console.log(" server started"))

app.get('/chats/:roomId',middleware,async function(req,res){
    try {
        const roomId=Number(req.params.roomId);
        const messages=await prismaClient.chat.findMany({
            where:{
                roomId
            },
            orderBy:{
                "id":"desc"
            },
            take:50
        })
         return res.json({
            success:true,
            message:messages
        })
    } catch (error) {
        console.log(error);
         return res.json({
            success:false,
            message:` error in catch block ${error}`
        })
    }
})

app.get('/room/:slug',middleware,async function(req,res){
    try {
        const slug=req.params.slug  as string;
        const room=await prismaClient.room.findFirst({
            where:{
                slug
            }
        })
         return res.json({
            success:true,
           room
        })
    } catch (error) {
        console.log(error);
         return res.json({
            success:false,
            message:` error in catch block ${error}`
        })
    }
})