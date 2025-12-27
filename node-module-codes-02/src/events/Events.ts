import { EventEmitter } from "node:events";

const emitter=new EventEmitter();
function auditListner(taskId:number){
    console.log("Audit log For Task :",taskId);

}
emitter.on("task:created",(id)=>{
   console.log("Task Created",id);
});
emitter.on("task:created",auditListner);

emitter.emit("task:created",1);
emitter.off("task:created",auditListner);
emitter.emit("task:created", 2);