import axios from "axios";
import { BACKEND_URL } from "../app/config";
import ChatRoomClient from "./ChatRoomClient";


async function getChat(id: Number) {
  try {
    const response = await axios.get(`${BACKEND_URL}/chats/${id}`);
    return response.data.message;
  } catch (e) {
    console.error(e);
    return [];
  }
}
export default async function ChatRoom({id}:{id:Number}){
    const roomId=id;
    const chats=await getChat(roomId);
    console.log(chats)
console.log(Array.isArray(chats))
    return <ChatRoomClient id={roomId} messages={chats} />
}