const {pool} = require('../utils/database');

exports.getOrganismous = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query('SELECT * FROM organismos')
        .then(([rows, fields]) => {
            res.render('organismos.ejs', {
                pageTitle: "ΟΡΓΑΝΙΣΜΟΙ",
                organismoi: rows,
                messages: messages
            })
        })
    })
}

exports.postOrganismo = (req, res, next) => {

    /* get necessary data sent */
    const sunt = req.body.sunt;
    const onoma = req.body.onoma;
    const odos = req.body.odos;
    const arithmos = req.body.arithmos;
    const tk = req.body.tk;
    const poli = req.body.poli;
    const tupos = req.body.tupos;
    const idia_kef = req.body.idia_kef;
    const proup_upour = req.body.proup_upour;
    const proup_idiwt = req.body.proup_idiwt;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO organismos (id, συντομογραφια, ονομα, οδος, αριθμος, ταχ_κωδικας, πολη, τυπος, ιδια_κεφαλαια, προυπ_υπουργειο, προυπ_ιδιωτ) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        conn.promise().query(sqlQuery, [sunt, onoma, odos, arithmos, tk, poli, tupos, idia_kef, proup_upour, proup_idiwt])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Οργανισμός!" })
            res.redirect('/organismos/creation-page');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Οργανισμός could not be added." })
            res.redirect('/organismos');
        })
    })
}

exports.getCreateOrganismo = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    res.render('create-organismo.ejs', {
        pageTitle: "Προσθήκη οργανισμού",
        messages: messages
    })
}

exports.postUpdateOrganismo = (req, res, next) => {

    /* get necessary data sent */
    const sunt = req.body.sunt;
    const onoma = req.body.onoma;
    const odos = req.body.odos;
    const arithmos = req.body.arithmos;
    const tk = req.body.tk;
    const poli = req.body.poli;
    const tupos = req.body.tupos;
    const idia_kef = req.body.idia_kef;
    const proup_upour = req.body.proup_upour;
    const proup_idiwt = req.body.proup_idiwt;
    
    const og_id = req.params.id;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE organismos SET συντομογραφια = ?, ονομα = ?, οδος = ?, αριθμος = ?, ταχ_κωδικας = ?, πολη = ?, τυπος = ?, ιδια_κεφαλαια = ?, προυπ_υπουργειο = ?, προυπ_ιδιωτ WHERE id = ${og_id}`;

        conn.promise().query(sqlQuery, [sunt, onoma, odos, arithmos, tk, poli, tupos, idia_kef, proup_upour, proup_idiwt])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated Οργανισμός!" })
            res.redirect('/organismos');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Οργανισμός could not be updated." })
            res.redirect('/organismos');
        })
    })
}

exports.postDeleteOrganismo = (req, res, next) => {
    /* get id from params */
    const id = req.params.id;
    
    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE FROM organismos WHERE id = ${id}`;

        conn.promise().query(sqlQuery)
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted Οργανισμός!" })
            res.redirect('/organismos');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Οργανισμός could not be deleted." })
            res.redirect('/organismos');
        })
    })

}