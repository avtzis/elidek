const {pool} = require('../utils/database');

exports.getEreunites = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query('SELECT * FROM ereunitis')
        .then(([rows, fields]) => {
            res.render('ereunitis.ejs', {
                pageTitle: "ΕΡΕΥΝΗΤΕΣ",
                ereunites: rows,
                messages: messages
            })
        })
    })
}

exports.postEreuniti = (req, res, next) => {

    /* get necessary data sent */
    //const afm = req.body.afm;
    const onoma = req.body.onoma;
    const epwnumo = req.body.epwnumo;
    const fulo = req.body.fulo;
    const imer_gennisis = req.body.imer_gennisis;
    const org_suntom = req.body.org_suntom;
    const org_imer_enarksis = req.body.org_imer_enarksis;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO ereunitis (id, ονομα, επωνυμο, φυλο, ημερομηνια_γεννησης, org_id, οργανισμος_ημερομηνια_εναρξης) VALUES (NULL, ?, ?, ?, ?, ?, ?)`;

        conn.promise().query(sqlQuery, [onoma, epwnumo, fulo, imer_gennisis, org_suntom, org_imer_enarksis])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Ερευνητής!" })
            res.redirect('/ereunitis/creation-page');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Ερευνητής could not be added." })
            res.redirect('/ereunitis');
        })
    })
}

exports.getCreateEreuniti = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    res.render('create-ereuniti.ejs', {
        pageTitle: "Προσθήκη ερευνητή",
        messages: messages
    })
}

exports.postUpdateEreuniti = (req, res, next) => {

    /* get necessary data sent */
    //const afm = req.body.afm;
    const onoma = req.body.onoma;
    const epwnumo = req.body.epwnumo;
    const fulo = req.body.fulo;
    const imer_gennisis = req.body.imer_gennisis;
    const org_suntom = req.body.org_suntom;
    const org_imer_enarksis = req.body.org_imer_enarksis;
    
    const og_id = req.params.id;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE ereunitis SET id = ?, ονομα = ?, επωνυμο = ?, φυλο = ?, ημερομηνια_γεννησης = ?, org_id = ?, οργανισμος_ημερομηνια_εναρξης = ? WHERE ereunitis.id = ${og_id}`;

        conn.promise().query(sqlQuery, [onoma, epwnumo, fulo, imer_gennisis, org_suntom, org_imer_enarksis])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated Ερευνητής!" })
            res.redirect('/ereunitis');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Ερευνητής could not be updated." })
            res.redirect('/ereunitis');
        })
    })
}

exports.postDeleteEreuniti = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM ereunitis WHERE id = ${id}`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted Ερευνητής!" })
            res.redirect('/ereunitis');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Ερευνητής could not be deleted." })
            res.redirect('/ereunitis');
        })
    })

}