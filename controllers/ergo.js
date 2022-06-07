const {pool} = require('../utils/database');

exports.getErga = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query('SELECT * FROM ergo')
        .then(([rows, fields]) => {
            res.render('ergo.ejs', {
                pageTitle: "ΕΡΓΑ",
                erga: rows,
                messages: messages
            })
        })
    })
}

exports.postErgo = (req, res, next) => {

    /* get necessary data sent */
    const id = req.body.id;
    const titlos = req.body.titlos;
    const perilipsi = req.body.perilipsi;
    const imer_enarksis = req.body.imer_enarksis;
    const imer_liksis = req.body.imer_liksis;
    const upeu_afm = req.body.upeu_afm;
    const aksiol_afm = req.body.aksiol_afm;
    const vathmos = req.body.vathmos;
    const imer_aksiol = req.body.imer_aksiol;
    const stel_afm = req.body.stel_afm;
    const org_sunt = req.body.org_sunt;
    const prog_titlos = req.body.prog_titlos;
    const poso_epixor = req.body.poso_epixor == ''? 100000: req.body.poso_epixor;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        let sqlQuery, queryTable;
        if(imer_liksis == '') {
            sqlQuery = `INSERT INTO ergo (id, τιτλος, περιληψη, ημερομηνια_εναρξης, ημερομηνια_ληξης, υπευθυνος_id, αξιολογητης_id, βαθμος_αξιολογησης, ημερομηνια_αξιολογησης, stel_id, org_id, prog_id, ποσο_επιχορηγησης) VALUES (NULL, ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, ?)`;
            queryTable = [titlos, perilipsi, imer_enarksis, upeu_afm, aksiol_afm, vathmos, imer_aksiol, stel_afm, org_sunt, prog_titlos, poso_epixor];
        } else {
            sqlQuery = `INSERT INTO ergo (id, τιτλος, περιληψη, ημερομηνια_εναρξης, ημερομηνια_ληξης, υπευθυνος_id, αξιολογητης_id, βαθμος_αξιολογησης, ημερομηνια_αξιολογησης, stel_id, org_id, prog_id, ποσο_επιχορηγησης) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            queryTable = [titlos, perilipsi, imer_enarksis, imer_liksis, upeu_afm, aksiol_afm, vathmos, imer_aksiol, stel_afm, org_sunt, prog_titlos, poso_epixor];
        }
            
        conn.promise().query(sqlQuery, queryTable)
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Έργο!" })
            res.redirect('/ergo');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Έργο could not be added." })
            res.redirect('/ergo');
        })
    })
}

exports.getCreateErgo = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    res.render('create-ergo.ejs', {
        pageTitle: "Προσθήκη έργου",
        messages: messages
    })
}

exports.postUpdateErgo = (req, res, next) => {

    /* get necessary data sent */
    const titlos = req.body.titlos;
    const perilipsi = req.body.perilipsi;
    const imer_enarksis = req.body.imer_enarksis;
    const imer_liksis = req.body.imer_liksis;
    const upeu_afm = req.body.upeu_afm;
    const aksiol_afm = req.body.aksiol_afm;
    const vathmos = req.body.vathmos;
    const imer_aksiol = req.body.imer_aksiol;
    const stel_afm = req.body.stel_afm;
    const org_sunt = req.body.org_sunt;
    const prog_titlos = req.body.prog_titlos;
    const poso_epixor = req.body.poso_epixor;
    
    const og_id = req.params.id;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        if(imer_liksis == '') {
            sqlQuery = `UPDATE ergo SET τιτλος = ?, περιληψη = ?, ημερομηνια_εναρξης = ?, υπευθυνος_id = ?, αξιολογητης_id = ?, βαθμος_αξιολογησης = ?, ημερομηνια_αξιολογησης = ?, stel_id = ?, org_id = ?, prog_id = ?, ποσο_επιχορηγησης = ? WHERE ergo.id = ${og_id}`;
            queryTable = [titlos, perilipsi, imer_enarksis, upeu_afm, aksiol_afm, vathmos, imer_aksiol, stel_afm, org_sunt, prog_titlos, poso_epixor];
        } else {
            sqlQuery = `UPDATE ergo SET τιτλος = ?, περιληψη = ?, ημερομηνια_εναρξης = ?, ημερομηνια_ληξης = ?, υπευθυνος_id = ?, αξιολογητης_id = ?, βαθμος_αξιολογησης = ?, ημερομηνια_αξιολογησης = ?, stel_id = ?, org_id = ?, prog_id = ?, ποσο_επιχορηγησης = ? WHERE ergo.id = ${og_id}`;
            queryTable = [titlos, perilipsi, imer_enarksis, imer_liksis, upeu_afm, aksiol_afm, vathmos, imer_aksiol, stel_afm, org_sunt, prog_titlos, poso_epixor];
        }

        conn.promise().query(sqlQuery, queryTable)
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated έργο!" })
            res.redirect('/ergo');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, έργο could not be updated." })
            res.redirect('/ergo');
        })
    })
}

exports.postDeleteErgo = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM ergo WHERE id = ${id}`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted έργο!" })
            res.redirect('/ergo');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, έργο could not be deleted." })
            res.redirect('/ergo');
        })
    })

}

exports.getEreu = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query(`SELECT * FROM ereunitis left outer join ergo_ereu l on l.ereu_id=ereunitis.id inner join ergo on ergo.id=l.ergo_id and ergo_id = ${req.params.id} group by ereunitis.id`)
        .then(([rows, fields]) => {
            res.render('ereunitis.ejs', {
                pageTitle: "ΕΡΕΥΝΗΤΕΣ ΣΕ ΕΡΓΟ",
                ereunites: rows,
                messages: messages
            })
        })
    })
}