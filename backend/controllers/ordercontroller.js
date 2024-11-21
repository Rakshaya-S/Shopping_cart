import { db } from "../config/databaseconnect.js";

export const createorder = async (req, res, next) => {
    const cartitems = req.body;
    const amount = Number(cartitems.reduce((acc, items) => (acc + (items.product.price * items.qty)), 0)).toFixed(2);
    const status = "pending";

    try {
        await db.query('BEGIN');
        for (const item of cartitems) {
            const productid = item.product.id;
            const orderedQty = item.qty;
            console.log('Stock update query for product:', productid, 'with orderedQty:', orderedQty);
            
            // Fetch current stock
            const stockResult = await db.query("SELECT stock FROM product WHERE id = $1", [productid]);
            const currentStock = stockResult.rows[0]?.stock; // Correctly access the stock value
            const r=currentStock - orderedQty
            if (currentStock !== undefined) {
                console.log('Current stock for product:', currentStock);
                console.log('Updated stock after order:', currentStock - orderedQty); // Perform the calculation

                // Update stock if sufficient
                await db.query(
                    "UPDATE product SET stock = $1 WHERE id = $2 AND stock >= $3",
                    [r, productid,orderedQty]
                );
            } else {
                console.warn(`Product ID ${productid} not found.`);
            }
        }

        const cartitemsJSON = JSON.stringify(cartitems);
        const result = await db.query(
            "INSERT INTO orders (cartitem, amount, status) VALUES ($1, $2, $3) RETURNING *",
            [cartitemsJSON, amount, status]
        );
        await db.query('COMMIT'); // Commit transaction
        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        await db.query('ROLLBACK'); // Rollback transaction in case of error
        res.json({
            success: false,
            message: error.message
        });
    }
};
