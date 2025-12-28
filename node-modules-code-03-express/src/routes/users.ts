import {Router} from "express";
const router =Router();
router.get(":id/",(req,res)=>{
    res.json({
        message:"User Fethched",
        userId:req.params.id,
    });

});
router.get(":id/post",(req,res)=>{
    res.json({
       userid:req.params.id,
       limit:req.query.id
    });

});
export default router;
