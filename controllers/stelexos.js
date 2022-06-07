const {pool} = require('../utils/database');

exports.getStelexi = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query('SELECT * FROM  stelexos')
        .then(([rows, fields]) => {
            res.render('stelexos.ejs', {
                pageTitle: "ΣΤΕΛΕΧΗ",
                stelexi: rows,
                messages: messages
            })
        })
    })
}

exports.postStelexo = (req, res, next) => {

    /* get necessary data sent */
    //const afm = req.body.afm;
    const onoma = req.body.onoma;
    const epwnumo = req.body.epwnumo;
    const fulo = req.body.fulo;
    const imer_gennisis = req.body.imer_gennisis;
    const anag_ar = req.body.anag_ar;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO stelexos (id, ονομα, επωνυμο, φυλο, ημερομηνια_γεννησης, dieu_id) VALUES (NULL, ?, ?, ?, ?, ?)`;

        conn.promise().query(sqlQuery, [onoma, epwnumo, fulo, imer_gennisis, anag_ar])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Στέλεχος!" })
            res.redirect('/stelexos');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Στέλεχος could not be added." })
            res.redirect('/stelexos');
        })
    })
}

exports.getCreateStelexo = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    res.render('create-stelexo.ejs', {
        pageTitle: "Προσθήκη στελέχου",
        messages: messages
    })
}

exports.postUpdateStelexo = (req, res, next) => {

    /* get necessary data sent */
    //const afm = req.body.afm;
    const onoma = req.body.onoma;
    const epwnumo = req.body.epwnumo;
    const fulo = req.body.fulo;
    const imer_gennisis = req.body.imer_gennisis;
    const anag_ar = req.body.anag_ar;
    
    const id = req.params.id;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE stelexos SET ονομα = ?, επωνυμο = ?, φυλο = ?, ημερομηνια_γεννησης = ?, dieu_id = ? WHERE id = ${id}`;

        conn.promise().query(sqlQuery, [onoma, epwnumo, fulo, imer_gennisis, anag_ar])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated Στέλεχος!" })
            res.redirect('/stelexos');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Στέλεχος could not be updated." })
            res.redirect('/stelexos');
        })
    })
}

exports.postDeleteStelexo = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM stelexos WHERE id = ${id}`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted Στέλεχος!" })
            res.redirect('/stelexos');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Στέλεχος could not be deleted." })
            res.redirect('/stelexos');
        })
    })

}