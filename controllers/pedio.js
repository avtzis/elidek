const {pool} = require('../utils/database');

exports.getPedia = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query('SELECT * FROM pedio')
        .then(([rows, fields]) => {
            res.render('pedio.ejs', {
                pageTitle: "ΕΠΙΣΤΗΜΟΝΙΚΑ ΠΕΔΙΑ",
                pedia: rows,
                messages: messages
            })
        })
    })
}

exports.postPedio = (req, res, next) => {

    /* get necessary data sent */
    const onoma = req.body.onoma;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO pedio (id, ονομα) VALUES (NULL, ?)`;

        conn.promise().query(sqlQuery, [onoma])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Πεδίο!" })
            res.redirect('/pedio');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Πεδίο could not be added." })
            res.redirect('/pedio');
        })
    })
}

exports.getCreatePedio = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    res.render('create-pedio.ejs', {
        pageTitle: "Προσθήκη επιστημονικού πεδίου",
        messages: messages
    })
}

exports.postUpdatePedio = (req, res, next) => {

    /* get necessary data sent */
    const onoma = req.body.onoma;
    
    const id = req.params.id;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE pedio SET ονομα = ? WHERE id = ${id}`;

        conn.promise().query(sqlQuery, [onoma])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated Πεδίο!" })
            res.redirect('/pedio');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Πεδίο could not be updated." })
            res.redirect('/pedio');
        })
    })
}

exports.postDeletePedio = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM pedio WHERE id = ${id}`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted Πεδίο!" })
            res.redirect('/pedio');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Πεδίο could not be deleted." })
            res.redirect('/pedio');
        })
    })

}