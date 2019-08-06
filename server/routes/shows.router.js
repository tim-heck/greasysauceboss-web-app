const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

/**
 * GET route for all shows
 */
router.get('/', (req, res) => {
    // console.log('shows GET route')
    const sqlText = `SELECT * FROM shows;`;
    pool.query(sqlText).then(result => {
        console.log(result);
        res.send(result.rows);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

/**
 * POST route for adding a new show
 */
router.post('/', (req, res) => {
    const sqlText = `
        INSERT INTO shows (show_date, location, ticket, ticket_url)
        VALUES ($1, $2, $3, $4);
    `;
    const values = [req.body.show_date, req.body.location, req.body.ticket, req.body.ticket_url];
    pool.query(sqlText, values).then(result => {
        console.log(result);
        res.sendStatus(201);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

/**
 * PUT route for updating a specific show
 */
router.put('/:id', (req, res) => {
    const sqlText = `
        UPDATE shows SET show_date = $1, location = $2, ticket = $3, ticket_url = $4
        WHERE id = $5;
    `;
    const values = [req.body.show_date, req.body.location, req.body.ticket, req.body.ticket_url, req.params.id];
    pool.query(sqlText, values).then(result => {
        console.log(result);
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

/**
 * DELETE route for deleting a specific show
 */
router.delete('/:id', (req, res) => {
    const sqlText = `
        DELETE FROM shows WHERE id = $1;
    `;
    const values = [req.params.id];
    pool.query(sqlText, values).then(result => {
        console.log(result);
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

module.exports = router;