"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../app/hooks/useSocket";
// type Chat = {
//   id: Number;
//   message: string;
// };
export default function ChatRoomClient({
  id,
  messages,
}: {
  messages:{message:string}[];
  id: Number;
}){
    const {loading,socket}=useSocket();
    const [chats, setChats] = useState(messages);
    const [currentMsg,setCurrentMsg]=useState("")
    useEffect(()=>{
        if(socket && !loading){
            socket.send(JSON.stringify({
                type:"join_room",
                roomId:id
            }))
            socket.onmessage=(event)=>{
                const parsedData=JSON.parse(event.data)
                if(parsedData.type==="chat"){
                    setChats(c=>[...c, {message: parsedData.message}])
                }
            }
        }
    },[socket,loading,id])

    return (
        <div style={{
    backgroundColor: "black",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height:"100vh",
    width:"100vw"
  }}>
        <div>
           {
                chats.map((m,i) => (
                    <div key={i}>{m.message}</div>
                ))
                }
        </div>
        <input type="text" name="" id="" value={currentMsg} onChange={(e)=>setCurrentMsg(e.target.value)} />
        <button
  onClick={() => {

    if (!currentMsg.trim()) return;

    setChats((c) => [
      ...c,
      { message: currentMsg }
    ]);

    socket?.send(
      JSON.stringify({
        type: "chat",
        roomId: id,
        message: currentMsg
      })
    );

    setCurrentMsg("");
  }}
>
  send message
</button>
        </div>
    )
}