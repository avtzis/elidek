const {pool} = require('../utils/database');

exports.getz8 = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query(`select ereunitis.id, ereunitis.ονομα, ereunitis.επωνυμο, count(*) as ηλικια from ergo_ereu inner join ereunitis on ergo_ereu.ereu_id = ereunitis.id inner join ergo on ergo_ereu.ergo_id = ergo.id
                                where (ergo.id, ereunitis.id) not in (SELECT ergo.id, ereunitis.id FROM ergo inner join ergo_ereu on ergo_ereu.ergo_id = ergo.id inner join ereunitis on ereunitis.id = ergo_ereu.ereu_id INNER JOIN paradoteo ON ergo.id = paradoteo.ergo_id)
                                group by ereunitis.id, ereunitis.ονομα HAVING count(*) >= 5
                                order by count(*) DESC
                                limit 5;`)
        .then(([rows, fields]) => {
            res.render('z8.ejs', {
                pageTitle: "ΖΗΤΟΥΜΕΝΟ 8",
                fields: rows,
                messages: messages
            })
        })
    })
}