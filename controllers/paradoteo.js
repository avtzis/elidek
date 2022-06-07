const {pool} = require('../utils/database');

exports.getParadotea = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query('SELECT * FROM paradoteo')
        .then(([rows, fields]) => {
            res.render('paradoteo.ejs', {
                pageTitle: "ΠΑΡΑΔΟΤΕΑ",
                paradotea: rows,
                messages: messages
            })
        })
    })
}

exports.postParadoteo = (req, res, next) => {

    /* get necessary data sent */
    const ergo_titlos = req.body.ergo_titlos;
    const titlos = req.body.titlos;
    const perilipsi = req.body.perilipsi;
    const imer = req.body.imer;
    

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO paradoteo (id, ergo_id, τιτλος, περιληψη, ημερομηνια_παραδοσης) VALUES (NULL, ?, ?, ?, ?)`;

        conn.promise().query(sqlQuery, [ergo_titlos, titlos, perilipsi, imer])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new παραδοτέο!" })
            res.redirect('/paradoteo');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, παραδοτέο could not be added." })
            res.redirect('/paradoteo');
        })
    })
}

exports.getCreateParadoteo = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    res.render('create-paradoteo.ejs', {
        pageTitle: "Προσθήκη παραδοτέου",
        messages: messages
    })
}

exports.postUpdateParadoteo = (req, res, next) => {

    /* get necessary data sent */
    const ergo_titlos = req.body.ergo_titlos;
    const titlos = req.body.titlos;
    const perilipsi = req.body.perilipsi;
    const imer = req.body.imer;
    
    const og_id = req.params.id;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE paradoteo SET ergo_id = ?, τιτλος = ?, περιληψη = ?, ημερομηνια_παραδοσης = ? WHERE id = ${og_id}`;

        conn.promise().query(sqlQuery, [ergo_titlos, titlos, perilipsi, imer])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated παραδοτέο!" })
            res.redirect('/paradoteo');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, παραδοτέο could not be updated." })
            res.redirect('/paradoteo');
        })
    })
}

exports.postDeleteParadoteo = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM paradoteo WHERE id = ${id}`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted παραδοτέο!" })
            res.redirect('/paradoteo');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, παραδοτέο could not be deleted." })
            res.redirect('/paradoteo');
        })
    })

}