import pg from "pg";
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

const db=new pg.Client({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT
})

const connectDB=async()=>{
    try{
        await db.connect();
        console.log("db connected successfully");

    }catch(err){
        console.log(err);
    }
}

export {db,connectDB};