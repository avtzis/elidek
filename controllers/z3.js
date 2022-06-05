const {pool} = require('../utils/database');

exports.getz3 = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        const id = req.params.id;
        conn.promise().query(`select pedio.ονομα, ergo.τιτλος, ergo.διαρκεια, ergo.ενεργο, group_concat(concat(ereunitis.ονομα, _utf8' ', ereunitis.επωνυμο) SEPARATOR ', ') as ερευνητες
                                from ergo 
                                left outer join ergo_pedio l1 on l1.ergo_id=ergo.id
                                inner join pedio on pedio.id=l1.pedio_id and pedio.id = ${id}
                                left outer join ergo_ereu l2 on l2.ergo_id=ergo.id
                                inner join ereunitis on ereunitis.id=l2.ereu_id
                                where (ergo.διαρκεια <= 1 and ergo.ενεργο = 1)
                                group by ergo.τιτλος;`)
        .then(([rows, fields]) => {
            res.render('z3.ejs', {
                pageTitle: "ΖΗΤΟΥΜΕΝΟ 3",
                fields: rows,
                messages: messages
            })
        })
    })
}