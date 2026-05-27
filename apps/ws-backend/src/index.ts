import {WebSocket, WebSocketServer} from "ws";
import jwt, { JwtPayload } from 'jsonwebtoken'
import {JWT_SECRET} from '@repo/backend-common/config'
import { prisma as prismaClient } from '@repo/db/client'
import "dotenv/config";
const wss=new WebSocketServer({port:8080});
    // DEMO::
    // const users=[
    //     {
    //         userId:1,
    //         romms:["room1","romm2"],
    //         ws:socket
    //     },
    //      {
    //         userId:2,
    //         romms:["room1"],
    //         ws:socket
    //     },
    //      {
    //         userId:3,
    //         romms:[],
    //         ws:socket
    //     },
    // ]

    interface User{
        ws:WebSocket,
        rooms:string[],
        userId:string
    }

    const users:User[]=[];

 function checkUser(token:string):string | null{
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        console.log("decoded value print:");
        console.log(decoded);
        if(!decoded || !(decoded as JwtPayload).userId){
       return null;
    }
    // @ts-ignore
    return decoded.userId;
    
 }catch(e){
    console.log(e);
    return null;
 }
 }
wss.on('connection',function connection(ws,request){
    const url=request.url;//  ws://localhost:3000?token=12123
    if(!url){
        return;
    }
    const queryParams=new URLSearchParams(url.split('?')[1]);
    const token=queryParams.get("token") || "";
    // token ko check krenge ab
    const userId=checkUser(token)
    console.log(userId)
    if(userId==null){
        ws.close();
        return;
    }
    users.push({
        //@ts-ignore
        userId,
        rooms:[],
        ws
    })
    // agr hain to listen kregnge ab msg ko
    ws.on('message',async function message(data){
        const parsedData=JSON.parse(data as unknown as  string)
        // {
        //     type:"join_room",
        //     roomId:"room1"
        // }
        if(parsedData.type=='join_room'){
            const user=users.find(u=>u.ws===ws)
            user?.rooms.push(parsedData.roomId)
        }
         // {
        //     type:"leave_room",
        //     roomId:"room1"
        // }
        if(parsedData.type=='leave_room'){
            const user=users.find(u=>u.ws===ws)
            if(!user)return;
            user.rooms=user?.rooms.filter(r=>r!==parsedData.room)
        }
         // {
        //     type:"chat",
        //    roomId:"room1"
        //     message:"hi there"
        // }
        if(parsedData.type=='chat'){
            const roomId=parsedData.roomId
            const message=parsedData.message
            await prismaClient.chat.create({
                data:{
                    userId,
                    message,
                    roomId
                }
            })
            users.forEach(user=>{
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type:'chat',
                        roomId,
                        message:message
                    }))
                }
        })
        }
        // modification:-
        // user subscribed to romm1 but can send to any other romms
        // allow some users only
    });
});