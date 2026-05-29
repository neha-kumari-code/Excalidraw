import { ReactNode } from "react";
export default function IconButton({icon,onClick,active}:{
    icon:ReactNode,
    onClick:()=>void,
    active:boolean
}){
    return <div className={`cursor-pointer rounded border p-2 bg-gray-600 hover:bg-gray-300 ${active?"text-red-600":"text-white"}`} onClick={onClick}>
            {icon}
    </div>
}