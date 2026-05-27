"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const router=useRouter()
  const [slug,setSlug]=useState("")
  return (
    <div>
      <input type="text" name="" id="" value={slug} onChange={(e)=>setSlug(e.target.value)} />
      <button onClick={()=>router.push(`room/${slug}`)}>join room</button>
    </div>
  );
}
