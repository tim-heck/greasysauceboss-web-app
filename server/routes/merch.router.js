const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

/**
 * GET route for all products
 */
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM products ORDER BY id;`;
    pool.query(sqlText).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

/**
 * GET route for specific product
 */
router.get('/:id', (req, res) => {
    const sqlText = `SELECT * FROM products WHERE id = $1;`;
    pool.query(sqlText, [req.params.id]).then(result => {
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
        INSERT INTO products (title, description, price_pennies, image_url, hide)
        VALUES ($1, $2, $3, $4, $5);
    `;
    const values = [req.body.title, req.body.description, req.body.price_pennies, req.body.image_url, req.body.hide];
    pool.query(sqlText, values).then(result => {
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
        UPDATE products SET title = $1, description = $2, price_pennies = $3, image_url = $4, hide = $5
        WHERE id = $6;
    `;
    const values = [req.body.title, req.body.description, req.body.price_pennies, req.body.image_url, req.body.hide, req.params.id];
    pool.query(sqlText, values).then(result => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

/**
 * PUT route for updating a specific product's hide property
 */
router.put('/hide/:id', (req, res) => {
    const sqlText = `
        UPDATE products SET hide = $1
        WHERE id = $2;
    `;
    const values = [req.body.hide, req.params.id];
    pool.query(sqlText, values).then(result => {
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
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

module.exports = router;