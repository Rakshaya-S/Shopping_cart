import { db } from "../config/databaseconnect.js";

const getproducts = async (req, res) => {
    const keyword = req.query.keyword; 
    let query = "SELECT * FROM product";
    let params = []; 
    if (keyword) {
        query += " WHERE name ILIKE $1"; 
        params.push(`%${keyword}%`); 
    }

    try {
        const result = await db.query(query, params); 
        console.log(result.rows);
        res.json({
            success: true,
            data: result.rows
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: 'db not connected'
        });
    }
};


const getsingleproduct = async(req, res, next) => {
    const pid=req.params.id;
    try {
        const result=await db.query('SELECT * FROM product WHERE id=$1',[pid]);
        res.json({
            success: true,
            data:result.rows
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: 'db not connected'
        });
    }
};

export {getproducts,getsingleproduct}