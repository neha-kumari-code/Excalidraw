"use client"

import { useEffect, useRef, useState } from "react"
import IconButton from "./IconButton";
import { ArrowBigRightIcon, Circle, Pencil, RectangleCircle, RectangleHorizontal } from "lucide-react";
import { Game,Tool } from "@/draw/Game";
export default function MainCanvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef=useRef<Game | null>(null)

  const [tool, setTool] = useState<Tool>("rect")

  console.log("t:", tool)

    useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (canvasRef.current) {
      const canvas = canvasRef.current;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const game=new Game(canvas, roomId, socket, tool);
      gameRef.current=game;

      return ()=>{
        game.destroy();
      }
    }

  }, []);

  useEffect(()=>{
   gameRef.current?.setTool(tool);
  },[tool])

  return (
    <div className="relative bg-black">

      <div className="absolute top-4 left-4 z-10 border border-white p-2 flex gap-1">
         <IconButton icon={<Pencil/>} onClick={() => setTool("pencil")} active={tool==="pencil"} />
        <IconButton icon={<RectangleHorizontal/>} onClick={() => setTool("rect")} active={tool==="rect"} />
        <IconButton icon={<Circle/>} onClick={() => setTool("circle")} active={tool==="circle"} />
        <IconButton icon={<ArrowBigRightIcon/>} onClick={() => setTool("arrow")} active={tool==="arrow"} />
      </div>

      <canvas ref={canvasRef}></canvas>

    </div>
  )
}