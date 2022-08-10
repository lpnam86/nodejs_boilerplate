const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "dvdrental",
    password: "Luyennam123!",
    port: "5432",
})

const getActors = (req, res) => {
    pool.query('SELECT * FROM actor ORDER BY actor_id ASC', (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
}

const getActorbyId = (req, res) => {
    const actor_id = parseInt(req.params.actor_id)

    pool.query('SELECT * FROM actor WHERE actor_id = $1', [actor_id], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
}

const createActor = (req, res) => {
    const { first_name, last_name } = req.body

    pool.query(
        'INSERT INTO actor(first_name, last_name) VALUES ($1, $2) ',
        [first_name, last_name],
        (err, results) => {
            if (err) {
                throw err
            }
            res.status(201).send(`Actor added with ID: ${results.insertId}`)
        }
    )
}

const updateActor = (req, res) => {
    const actor_id = parseInt(req.params.actor_id)
    const { first_name, last_name, last_update } = req.body

    pool.query(
        'UPDATE actor SET first_name = $1, last_name = $2 WHERE actor_id = $3',
        [first_name, last_name, actor_id],
        (err, results) => {
            if (err) {
                throw err
            }
            res.status(200).send(`Actor modified with ID: ${actor_id}`)
        }
    )
}

const deleteActor = (req, res) => {
    const actor_id = parseInt(req.params.actor_id)
    if (!actor_id) {
        console.log('Data not exist!')
    }
    pool.query('DELETE FROM actor WHERE actor_id = $1', [actor_id], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).send(`Actor deleted with ID: ${actor_id}`)
    })
}

module.exports = {
    getActors,
    getActorbyId,
    createActor,
    updateActor,
    deleteActor,
}