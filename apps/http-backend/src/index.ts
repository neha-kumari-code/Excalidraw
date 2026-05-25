import express from 'express';
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '@repo/backend-common/config'
import { middleware } from './middleware';
import {UserSchema,SignInSchema,CreateRoomSchema} from '@repo/common/types'
import { prismaClient } from '@repo/db/client';
import bcrypt from 'bcrypt'
const app=express();
app.use(express.json());
app.post("/signup",async(req,res)=>{
    try{
    const result=UserSchema.safeParse(req.body)
    if(!result.success){
        return res.json({
            success:false,
            message:'invalid input'
        })
    }
   //db call
   const hashedPass=await bcrypt.hash(result.data.password,10);
    const user=await prismaClient.user.create({
        data:{
            name:result.data.name,
            password:hashedPass,
            email:result.data.email
        }
    })
    const token=jwt.sign({
            userId:user.id
        },JWT_SECRET)
   return res.json({
    success:true,
    token
   })
}catch(error){
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
                id:true
            }
        })
        if(!user){
             return res.json({
            success:false,
            message:'user does not exist'
        })
    }
    const match=await bcrypt.compare(result.data.password,result.data.password)
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
        
    }
})
app.listen(3000,()=>console.log(" server started"))