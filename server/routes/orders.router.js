const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/:user_id', (req, res) => {
    const sqlText = `SELECT * FROM orders WHERE user_id=$1;`;
    pool.query(sqlText, [req.params.user_id]).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    const sqlText = `
        INSERT INTO orders (order_date, user_id, total_price_pennies)
        VALUES ($1, $2, $3);
    `;
    const values = [req.body.order_date, req.user.id, req.body.total_price_pennies];
    pool.query(sqlText, values).then(result => {
        console.log(result);
        res.sendStatus(201);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

router.post('/cart', (req, res) => {
    const sqlText = `
        INSERT INTO line_items (quantity, order_id, product_id)
        VALUES ($1, $2, $3);
    `;
    const values = [req.body.quantity, req.order_id, req.body.product_id];
    pool.query(sqlText, values).then(result => {
        console.log(result);
        res.sendStatus(201);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

module.exports = router;