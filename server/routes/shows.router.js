const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

/**
 * GET route for all shows
 * Selects all the shows from the show's table and orders them by id
 */
router.get('/', (req, res) => {
    // console.log('shows GET route')
    const sqlText = `SELECT * FROM shows ORDER BY id ASC;`;
    pool.query(sqlText).then(result => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

/**
 * POST route for adding a new show
 * Adds a show to the shows table
 */
router.post('/', (req, res) => {
    const sqlText = `
        INSERT INTO shows (show_date, location, ticket, ticket_url)
        VALUES ($1, $2, $3, $4);
    `;
    const values = [req.body.date, req.body.location, req.body.ticket, req.body.ticket_url];
    pool.query(sqlText, values).then(result => {
        console.log(result.rows);
        res.sendStatus(201);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

/**
 * PUT route for updating a specific show
 * Updates a specific show in the shows table based on the id
 */
router.put('/:id', (req, res) => {
    console.log('req.body in PUT:', req.body)
    const sqlText = `
        UPDATE shows SET show_date = $1, location = $2, ticket = $3, ticket_url = $4
        WHERE id = $5;
    `;
    const values = [req.body.date, req.body.location, req.body.ticket, req.body.ticket_url, req.params.id];
    pool.query(sqlText, values).then(result => {
        console.log(result.rows);
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

/**
 * DELETE route for deleting a specific show
 * Removes a specific show based on the id
 */
router.delete('/:id', (req, res) => {
    const sqlText = `
        DELETE FROM shows WHERE id = $1;
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