import "dotenv/config";
import {Pool} from "pg";

export const pool=new Pool({
    connectionString:process.env.DATABASE_URL,

});
pool.connect(()=>{
    console.log("Connected to postgrace")
});