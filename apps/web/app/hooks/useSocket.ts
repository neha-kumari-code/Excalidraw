import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket(){
    const [loading,setLoading]=useState(true);
    const [socket,setSocket]=useState<WebSocket>();

    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}/token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYjg1YWRiMi02MGY2LTQ4OGYtOTdmZi1hZDQ5YTYyZTJjOTciLCJpYXQiOjE3Nzk4MDYyNTl9.sLD5Rb-JFZXq12SY7ArnFfYnlBq6dE2MV1OZ8GOdYOY`);
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws);
        }
    },[])
    return {
        socket,
        loading
    }
}