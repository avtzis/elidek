const {pool} = require('../utils/database');

exports.getz7 = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query(`select concat(stelexos.ονομα, _utf8' ', stelexos.επωνυμο) as ηλικια, organismos.ονομα, sum(ergo.ποσο_επιχορηγησης) as φυλο
                                from stelexos
                                inner join ergo on ergo.stel_id = stelexos.id
                                inner join organismos on organismos.id = ergo.org_id and organismos.τυπος = 'ΕΤΑΙΡΙΑ'
                                group by concat(stelexos.ονομα, _utf8' ', stelexos.επωνυμο)
                                order by sum(ergo.ποσο_επιχορηγησης) DESC
                                limit 5;`)
        .then(([rows, fields]) => {
            res.render('z7.ejs', {
                pageTitle: "ΖΗΤΟΥΜΕΝΟ 7",
                fields: rows,
                messages: messages
            })
        })
    })
}