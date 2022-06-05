const {pool} = require('../utils/database');

exports.getz22 = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query(`select * from view2;`)
        .then(([rows, fields]) => {
            res.render('z22.ejs', {
                pageTitle: "ΖΗΤΟΥΜΕΝΟ 2 - ΟΨΗ 2",
                fields: rows,
                messages: messages
            })
        })
    })
}