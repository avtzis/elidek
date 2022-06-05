const {pool} = require('../utils/database');

exports.getz4 = (req, res, next) => {

    let messages = req.flash("messages");
    if(messages.length == 0) messages = [];

    pool.getConnection((err, conn) => {
        conn.promise().query(`select organismos.ονομα
                                from organismos
                                where (
                                    (org_erga_in_year(2012, organismos.id) = org_erga_in_year(2013, organismos.id) and org_erga_in_year(2012, organismos.id) >= 10)
                                or (org_erga_in_year(2013, organismos.id) = org_erga_in_year(2014, organismos.id) and org_erga_in_year(2013, organismos.id) >= 10)
                                or (org_erga_in_year(2014, organismos.id) = org_erga_in_year(2015, organismos.id) and org_erga_in_year(2014, organismos.id) >= 10)
                                or (org_erga_in_year(2015, organismos.id) = org_erga_in_year(2016, organismos.id) and org_erga_in_year(2015, organismos.id) >= 10)
                                or (org_erga_in_year(2016, organismos.id) = org_erga_in_year(2017, organismos.id) and org_erga_in_year(2016, organismos.id) >= 10)
                                or (org_erga_in_year(2017, organismos.id) = org_erga_in_year(2018, organismos.id) and org_erga_in_year(2017, organismos.id) >= 10)
                                or (org_erga_in_year(2018, organismos.id) = org_erga_in_year(2019, organismos.id) and org_erga_in_year(2018, organismos.id) >= 10)
                                or (org_erga_in_year(2019, organismos.id) = org_erga_in_year(2020, organismos.id) and org_erga_in_year(2019, organismos.id) >= 10)
                                or (org_erga_in_year(2020, organismos.id) = org_erga_in_year(2021, organismos.id) and org_erga_in_year(2020, organismos.id) >= 10)
                                or (org_erga_in_year(2021, organismos.id) = org_erga_in_year(2022, organismos.id) and org_erga_in_year(2021, organismos.id) >= 10)
                                )
                                group by organismos.ονομα`)
        .then(([rows, fields]) => {
            res.render('z4.ejs', {
                pageTitle: "ΖΗΤΟΥΜΕΝΟ 4",
                fields: rows,
                messages: messages
            })
        })
    })
}