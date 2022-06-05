const {pool} = require('../utils/database');

exports.getDieuthinseis = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query('SELECT * FROM `dieuthinsi`')
        .then(([rows, fields]) => {
            res.render('dieuthinsi.ejs', {
                pageTitle: "ΔΙΕΥΘΥΝΣΕΙΣ ΕΛΙΔΕΚ",
                dieuthinseis: rows,
                messages: messages
            })
        })
    })
}

exports.postDieuthinsi = (req, res, next) => {

    const poli = req.body.poli;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO dieuthinsi (id, πολη) VALUES (NULL, ?)`;

        conn.promise().query(sqlQuery, [poli])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Διεύθυνση!" })
            res.redirect('/dieuthinsi/creation-page');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Διεύθυνση could not be added." })
            res.redirect('/dieuthinsi');
        })
    })
}

exports.getCreateDieuthinsi = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    res.render('create-dieuthinsi.ejs', {
        pageTitle: "Προσθήκη διεύθυνσης",
        messages: messages
    })
}

exports.postUpdateDieuthinsi = (req, res, next) => {

    /* get necessary data sent */
    const og_id = req.params.id;
    const id = req.body.id;
    const poli = req.body.poli;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE dieuthinsi SET id = ?, πολη = ? WHERE id = ${og_id}`;

        conn.promise().query(sqlQuery, [id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated Διεύθυνση!" })
            res.redirect('/dieuthinsi');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Διεύθυνση could not be updated." })
            res.redirect('/dieuthinsi');
        })
    })
}

exports.postDeleteDieuthinsi = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM dieuthinsi WHERE id = ${id}`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted Διεύθυνση!" })
            res.redirect('/dieuthinsi');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Διεύθυνση could not be deleted." })
            res.redirect('/dieuthinsi');
        })
    })

}