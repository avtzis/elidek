const {pool} = require('../utils/database');

exports.getProgrammata = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query('SELECT * FROM  programma')
        .then(([rows, fields]) => {
            res.render('programma.ejs', {
                pageTitle: "ΠΡΟΓΡΑΜΜΑΤΑ",
                programmata: rows,
                messages: messages
            })
        })
    })
}

exports.postProgramma = (req, res, next) => {

    /* get necessary data sent */
    const titlos = req.body.titlos;
    const anag_ar = req.body.anag_ar;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO programma (id, τιτλος, dieu_id) VALUES (NULL, ?, ?)`;

        conn.promise().query(sqlQuery, [titlos, anag_ar])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Πρόγραμμα!" })
            res.redirect('/programma');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Πρόγραμμα could not be added." })
            res.redirect('/programma');
        })
    })
}

exports.getCreateProgramma = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    res.render('create-programma.ejs', {
        pageTitle: "Προσθήκη πρόγραμμα",
        messages: messages
    })
}

exports.postUpdateProgramma = (req, res, next) => {

    /* get necessary data sent */
    const titlos = req.body.titlos;
    const anag_ar = req.body.anag_ar;
    
    const id = req.params.id;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE programma SET τιτλος = ?, dieu_id = ? WHERE id = ${id}`;

        conn.promise().query(sqlQuery, [titlos, anag_ar])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated Πρόγραμμα!" })
            res.redirect('/programma');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Πρόγραμμα could not be updated." })
            res.redirect('/programma');
        })
    })
}

exports.postDeleteProgramma = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM programma WHERE id = ${id}`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted Πρόγραμμα!" })
            res.redirect('/programma');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Πρόγραμμα could not be deleted." })
            res.redirect('/programma');
        })
    })

}