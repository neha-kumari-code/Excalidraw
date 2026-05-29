import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { Shape } from "./Game";
export async function getExistingShapes(roomId: string): Promise<Shape[]> {
    try {
        const response = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);

        const messages = response.data.message;
        const shapes = messages.map((m: { message: string }) => {

            const messageData= JSON.parse(m.message);
            
            return messageData;
        });

        return shapes;
    } catch (e) {
        console.log(e);
        return []; // IMPORTANT
    }
}