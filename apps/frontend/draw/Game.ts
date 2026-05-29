import { getExistingShapes } from "./http";

export type Tool = "rect" | "circle" | "arrow" | "pencil";

export type Shape={
    type:"rect",
    x:number,
    y:number,
    width:number,
    height:number
} | {
    type:"circle",
    x:number,
    y:number,
    radius:number
} | {
    type:"line",
    x:number,
    y:number,
    endX:number,
    endY:number,
} | {
    type:"pencil",
    points:{x:number,y:number}[]
}

export class Game{
    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    private existingShapes:Shape[];
    private roomId:string;
    private socket:WebSocket;
    private clicked:boolean;
    private startX:number;
    private startY:number;
    private currentPoints: { x: number; y: number }[];
    private tool:Tool;
    private scale:number;
    private zoomSpeed:number;
    private cleanup:(()=>void) | null=null;
    constructor(canvas:HTMLCanvasElement,roomId:string,socket:WebSocket,tool:Tool){
        this.canvas=canvas;
        this.ctx=canvas.getContext("2d")!;
        this.existingShapes=[];
        this.roomId=roomId;
        this.socket=socket;
        this.init();
        this.initSocketHandler();
        this.clicked=false;
        this.startX=0;
        this.startY=0;
        this.currentPoints=[];
        this.tool=tool;
        this.scale=1;
        this.zoomSpeed=0.01;
        this.cleanup=this.mouseHandler()

    }

    async init(){
       this.existingShapes= await getExistingShapes(this.roomId);
       this.clearCanvas();
    }

    private messageHandler=(event:MessageEvent)=>{
        
            const message=JSON.parse(event.data);
            if(message.type=="chat"){
                const parsedShape=JSON.parse(message.message)
                this.existingShapes.push(parsedShape)
                 this.clearCanvas();
            }
          
    }

    initSocketHandler(){
        this.socket.addEventListener("message",this.messageHandler)
    }

    clearCanvas(){
        // Reset transformation matrix first
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.fillStyle="rgba(0, 0, 0)";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
            // Apply zoom
    this.ctx.scale(this.scale, this.scale);


        this.ctx.strokeStyle="rgb(255,255,255)";

        this.existingShapes.forEach((s)=>{

        if(s.type==="rect"){
            this.ctx.strokeRect(s.x,s.y,s.width,s.height)
        }else if(s.type=="circle"){
            this.ctx.beginPath();
            this.ctx.arc(s.x,s.y,s.radius,0,2*Math.PI);
            this.ctx.stroke();
        }else if(s.type=="line"){
            this.ctx.beginPath();
            this.ctx.moveTo(s.x,s.y);
            this.ctx.lineTo(s.endX,s.endY);
            this.ctx.stroke();
        }else if(s.type==="pencil"){
            const points=s.points;
            this.ctx.beginPath();
            for(let i=0;i<points.length;i++){
                const p=points[i];
                if(i==0)this.ctx.moveTo(p.x,p.y);
                else this.ctx.lineTo(p.x,p.y)
            }
            this.ctx.stroke();
        }
    })
    }

    handleMouseDown=(e:MouseEvent)=>{
            this.clicked=true;
            this.startX = e.offsetX;
            this.startY = e.offsetY;

            this.currentPoints=[{x:e.offsetX,y:e.offsetY}]
    }

    handleMouseUp=(e:MouseEvent)=>{
            this.clicked=false;
            const width = e.offsetX  - this.startX;
            const height = e.offsetY - this.startY;
           // when circle
               const radius=(Math.sqrt((width)**2+(height)**2))/2;
                const x=(e.offsetX+this.startX)/2;
                const y=(e.offsetY+this.startY)/2;
               
            let shape:Shape | null=null;
            if(this.tool==="rect"){
               shape={
                 type:"rect",
                x:this.startX,
                y:this.startY,
                width,
                height
               };
            }else if(this.tool==="circle"){ 
                shape={
                type:"circle",
                x,
                y,
               radius
                };
            }else if(this.tool==="arrow"){
                shape={
                    type:"line",
                    x:this.startX,
                    y:this.startY,
                    endX:e.offsetX,
                    endY:e.offsetY
                }
            }else if(this.tool==="pencil"){
                shape={
                    type:"pencil",
                    points:this.currentPoints
                }
            }
        if(!shape)return;
            this.existingShapes.push(shape)
            this.socket.send(JSON.stringify({
                type:"chat",
                message:JSON.stringify(shape),
                roomId:Number(this.roomId)
            }))
        this.clearCanvas();
    }

    handleMouseMove=(e:MouseEvent)=>{
            if(this.clicked){
           const width = e.offsetX - this.startX;
            const height = e.offsetY -this.startY;
          this.clearCanvas();
            this.ctx.strokeStyle="rgb(255,255,255)"
            console.log("too:",this.tool)
            if(this.tool==="rect"){
                console.log("rect excecuted")
                this.ctx.strokeRect(this.startX,this.startY,width,height)
            }else if(this.tool==="circle"){
                console.log("circle excecuted")
                const radius=(Math.sqrt((width)**2+(height)**2))/2;
                const x=(e.offsetX+this.startX)/2;
                const y=(e.offsetY+this.startY)/2;
                this.ctx.beginPath();
                this.ctx.arc(x,y,radius,0,2*Math.PI);
                this.ctx.stroke();
            }else if(this.tool==="arrow"){
                this.ctx.beginPath();
                this.ctx.moveTo(this.startX,this.startY);
                this.ctx.lineTo(e.offsetX,e.offsetY);
                this.ctx.stroke();
            }else if(this.tool==="pencil"){
                this.currentPoints.push({x:e.offsetX,y:e.offsetY});
                this.ctx.beginPath();
                for(let i=0;i<this.currentPoints.length;i++){
                    let curr=this.currentPoints[i];
                    if(i==0)this.ctx.moveTo(curr.x,curr.y)
                    else this.ctx.lineTo(curr.x,curr.y)
                }
                this.ctx.stroke();
            }
            }
    }

    wheelHandler=(e:WheelEvent)=>{
        e.preventDefault();// to stop page from  scrolling
        const prevScale=this.scale;
        const zoomIn=e.deltaY<0;

        if(zoomIn)this.scale=this.scale*(1+this.zoomSpeed);
        else this.scale=this.scale/(1+this.zoomSpeed);

        const rect=this.canvas.getBoundingClientRect();
        const mouseX=e.clientX-rect.left;
        const mouseY=e.clientY-rect.top;

        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.translate(mouseX,mouseY);
        this.ctx.scale(this.scale/prevScale,this.scale/prevScale);
        this.ctx.translate(-mouseX,-mouseY);
        this.clearCanvas();
    }

    mouseHandler(){
        this.canvas.addEventListener("mousedown",this.handleMouseDown)
        this.canvas.addEventListener("mouseup",this.handleMouseUp)
        this.canvas.addEventListener("mousemove",this.handleMouseMove)
        this.canvas.addEventListener("wheel",this.wheelHandler);

         return () => {
        this.canvas.removeEventListener("mousedown", this.handleMouseDown);
        this.canvas.removeEventListener("mousemove", this.handleMouseMove);
        this.canvas.removeEventListener("mouseup", this.handleMouseUp);
        }
    }

    destroy() {
        if(this.cleanup) {
            this.cleanup();
        }
        this.socket.removeEventListener(
        "message",
        this.messageHandler
        );
    }

    setTool(tool:Tool){
        this.tool = tool;
    }
}