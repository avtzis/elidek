const {pool} = require('../utils/database');

exports.getz6 = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query(`select ereunitis.id, ereunitis.ονομα, ereunitis.επωνυμο, ereunitis.ηλικια, count(*) as arithmos from ergo_ereu inner join ereunitis on ergo_ereu.ereu_id = ereunitis.id 
                                where (ereunitis.ηλικια < 40) 
                                group by ereunitis.id, ereunitis.ονομα
                                order by count(*) DESC
                                limit 5;`)
        .then(([rows, fields]) => {
            res.render('z6.ejs', {
                pageTitle: "ΖΗΤΟΥΜΕΝΟ 6",
                fields: rows,
                messages: messages
            })
        })
    })
}