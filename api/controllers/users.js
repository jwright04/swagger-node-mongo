'use strict';

let db = require('../../config/db')();

module.exports = {getAll, save, getOne, update, deleteUser};

//GET /users operationId
function getAll (req, res, next) {
    res.json({ users : db.find() })

}

//POST /users operationId
function save (req, res, next) {

    res.json({
        success     : db.save(req.body),
        description : "User added"
    });
}

//GET /users/{id} operationId
function getOne (req, res, next) {

    let id    = req.swagger.params.id.value; //req.swagger contains the path parameters
    let user = db.find(id);

    console.log("USER", user);
    if (user) {

        res.json(user);
    }
    else {
        res.status(204).send();
    }
}

//PUT /users/{id} operationId
function update (req, res, next) {

    let id   = req.swagger.params.id.value; //req.swagger contains the path parameters
    let user = req.body;

    if (db.update(id, user)) {
        res.json({
            success     : 1,
            description : "User updated!"
        })

    }
    else {
        res.status(204).send();
    }
}

// DELETE /users/{id} operationId
function deleteUser (req, res, next) {

    let id = req.swagger.params.id.value;

    if (db.remove(id)) {
        res.json({success: 1, description: "User deleted!"})
    } else {

        res.status(204).send();
    }

}