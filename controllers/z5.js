const {pool} = require('../utils/database');

exports.getz5 = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query(`select DISTINCT p1.ονομα as p1, p2.ονομα as p2, SUM(ergo.ποσο_επιχορηγησης) as ποσο, group_concat(ergo.τιτλος SEPARATOR ', ') as εργα
                                from pedio p1 
                                left outer join ergo_pedio l1 on p1.id=l1.pedio_id 
                                inner join ergo on l1.ergo_id=ergo.id 
                                inner join ergo_pedio l2 on ergo.id = l2.ergo_id 
                                inner join pedio p2 on l2.pedio_id = p2.id and p2.id > p1.id 
                                GROUP by p1.ονομα, p2.ονομα
                                order by SUM(ergo.ποσο_επιχορηγησης) DESC
                                limit 5;`)
        .then(([rows, fields]) => {
            res.render('z5.ejs', {
                pageTitle: "ΖΗΤΟΥΜΕΝΟ 5",
                fields: rows,
                messages: messages
            })
        })
    })
}