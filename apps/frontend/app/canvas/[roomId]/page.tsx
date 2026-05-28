"use client"
import { useEffect, useRef } from "react"

export default function Canvas(){
    const canvasRef=useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        if(canvasRef.current){
          const canvas=canvasRef.current;
          const ctx=canvas.getContext("2d");
          if(!ctx)return;
          let clicked=false;
          let startX=0;
          let startY=0;
          canvas.addEventListener("mousedown",(e)=>{
            clicked=true;
            startX=e.clientX;
            startY=e.clientY;
          })
          let width=0;
          let height=0;
          canvas.addEventListener("mouseup",(e)=>{
            clicked=false;
            width=e.clientX-startX;
            height=e.clientY-startY;
          })
          canvas.addEventListener("mousemove",(e)=>{
            if(clicked){
            width=e.clientX
            height=e.clientY
            ctx.clearRect(0,0,canvas.width,canvas.height)
            ctx.strokeRect(startX,startY,width,height)
            }
          })
        }
    },[canvasRef])
    return (
    <div>
            <canvas ref={canvasRef} height={500} width={500}></canvas>
    </div>
    )
}