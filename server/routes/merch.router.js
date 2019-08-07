const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

/**
 * GET route for all products
 */
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM products;`;
    pool.query(sqlText).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

/**
 * POST route for a new product
 */
router.post('/', (req, res) => {
    const sqlText = `
        INSERT INTO products (title, description, price_pennies, image_url)
        VALUES ($1, $2, $3, $4);
    `;
    const values = [req.body.title, req.body.description, req.body.price_pennies, req.body.image_url];
    pool.query(sqlText, values).then(result => {
        console.log(result.rows);
        res.sendStatus(201);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

/**
 * PUT route for updating a specific product
 */
router.put('/:id', (req, res) => {
    const sqlText = `
        UPDATE products SET title = $1, description = $2, price_pennies = $3, image_url = $4
        WHERE id = $5;
    `;
    const values = [req.body.title, req.body.description, req.body.price_pennies, req.body.image_url, req.params.id];
    pool.query(sqlText, values).then(result => {
        console.log(result.rows);
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

/**
 * DELETE route for deleting a specific product
 */
router.delete('/:id', (req, res) => {
    const sqlText = `
        DELETE FROM products WHERE id = $1;
    `;
    const values = [req.params.id];
    pool.query(sqlText, values).then(result => {
        console.log(result.rows);
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

module.exports = router;