const {pool} = require('../utils/database');

exports.getz2 = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query(`select * from view1`)
        .then(([rows, fields]) => {
            res.render('z2.ejs', {
                pageTitle: "ΖΗΤΟΥΜΕΝΟ 2 - ΟΨΗ 1",
                fields: rows,
                messages: messages
            })
        })
    })
}