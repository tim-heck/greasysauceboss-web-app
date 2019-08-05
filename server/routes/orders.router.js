const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// router.get('/', (req, res) => {
//     const sqlText = `SELECT * FROM orders;`;
//     pool.query(sqlText).then(result => {
//         res.send(result.rows);
//     }).catch(err => {
//         console.log(err);
//         res.sendStatus(500);
//     })
// })

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

// router.put('/:id', (req, res) => {
//     const sqlText = `
//         UPDATE products SET title = $1, description = $2, price_pennies = $3, image_url = $4
//         WHERE id = $5;
//     `;
//     const values = [req.body.title, req.body.description, req.body.price_pennies, req.body.image_url, req.params.id];
//     pool.query(sqlText, values).then(result => {
//         console.log(result);
//         res.sendStatus(200);
//     }).catch(err => {
//         console.log(err);
//         res.sendStatus(500);
//     })
// })

// router.delete('/:id', (req, res) => {
//     const sqlText = `
//         DELETE FROM products WHERE id = $1;
//     `;
//     const values = [req.params.id];
//     pool.query(sqlText, values).then(result => {
//         console.log(result);
//         res.sendStatus(200);
//     }).catch(err => {
//         console.log(err);
//         res.sendStatus(500);
//     })
// })

module.exports = router;