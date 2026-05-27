import axios from 'axios'
import { BACKEND_URL } from '../../config';
import ChatRoom from '../../../components/ChatRoom';
async function getRoomId(slug:string){
    const response=await axios.get(`${BACKEND_URL}/room/${slug}`)
    const id=response.data.room.id;
    return id;
}

export default async function chatRoom({params}:{params:{slug:string}}){
    const slug=(await params).slug;
    const id= await getRoomId(slug)
    console.log("slug: ",slug);
    console.log("id: ",id);
    console.log( typeof id)
    return <ChatRoom id={id} />
}