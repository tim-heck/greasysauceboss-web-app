const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
// const axios = require('axios');

router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM orders;`;
    pool.query(sqlText).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

router.get('/:user_id', (req, res) => {
    const sqlText = `
        SELECT orders.order_date, orders.user_id, orders.total_price_pennies, 
        line_items.quantity, line_items.order_id, 
        products.title, products.description, products.price_pennies, products.image_url
        FROM orders
        JOIN "user" ON "user".id = $1
        JOIN line_items ON line_items.order_id = orders.id
        JOIN products ON line_items.product_id = products.id;`;
    pool.query(sqlText, [req.user.id]).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

router.post('/', async (req, res) => {
    const client = await pool.connect();

    try {
        const {
            total_price_pennies,
            cart
        } = req.body;
        // console.log('req.body', req.body);
        await client.query('BEGIN')
        // Grabs date snippet from: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        // end date snippet
        // console.log('req.user', req.user);
        // console.log('req.user.id:',req.user.id);
        const orderInsertDetails = await client.query(`
        INSERT INTO orders (order_date, user_id, total_price_pennies)
        VALUES ($1, $2, $3) 
        RETURNING id;`, [today, req.user.id, total_price_pennies]);
        console.log(orderInsertDetails.rows[0].id);
        const orderId = orderInsertDetails.rows[0].id;

        await Promise.all(cart.map(cartItem => {
            const insertLineItemText = `INSERT INTO line_items (quantity, order_id, product_id) VALUES ($1, $2, $3);`;  
            const insertLineItemValues = [cartItem.quantity, orderId, cartItem.id];
            return client.query(insertLineItemText, insertLineItemValues);
        }));

        await client.query('COMMIT');
        res.sendStatus(201);
    } catch (err) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/orders', err);
        res.sendStatus(500);
    } finally {
        client.release();
    }
})

router.post('/cart', (req, res) => {
    const sqlText = `
        INSERT INTO line_items (quantity, order_id, product_id)
        VALUES ($1, $2, $3);
    `;
    const values = [req.body.quantity, req.order_id, req.body.product_id];
    pool.query(sqlText, values).then(result => {
        res.sendStatus(201);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

module.exports = router;