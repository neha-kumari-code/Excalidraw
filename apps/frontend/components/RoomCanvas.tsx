"use client"
import { WS_URL } from "@/config";
import { InitDraw } from "@/draw";
import { useEffect, useRef, useState } from "react"
import Canvas from "./MainCanvas";
import MainCanvas from "./MainCanvas";

export default function RoomCanvas({roomId}:{roomId:string}){
     const [socket,setSocket]=useState<WebSocket | null>();
        useEffect(()=>{
            const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYjg1YWRiMi02MGY2LTQ4OGYtOTdmZi1hZDQ5YTYyZTJjOTciLCJpYXQiOjE3Nzk4MDYyNTl9.sLD5Rb-JFZXq12SY7ArnFfYnlBq6dE2MV1OZ8GOdYOY`);
            ws.onopen=()=>{
                setSocket(ws)
                ws.send(JSON.stringify({
                    type:"join_room",
                    roomId:Number(roomId)
                }))
            }
        },[])

   

    if(!socket){
        return <div>
            server is connecting...
        </div>
    }
     return <MainCanvas roomId={roomId} socket={socket} />
}