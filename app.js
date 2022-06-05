const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

require('custom-env').env('localhost');

/* ROUTES and how to import routes */

const layout = require('./routes/layout');
const ereunitis = require('./routes/ereunitis');
const ergo = require('./routes/ergo');
const dieuthinsi = require('./routes/dieuthinsi');
const pedio = require('./routes/pedio');
const organismos = require('./routes/organismos');
const paradoteo = require('./routes/paradoteo');
const programma = require('./routes/programma');
const stelexos = require('./routes/stelexos');
const z2 = require('./routes/z2');
const z22 = require('./routes/z22');
const z3 = require('./routes/z3');
const z4 = require('./routes/z4');
const z5 = require('./routes/z5');
const z6 = require('./routes/z6');
const z7 = require('./routes/z7');
const z8 = require('./routes/z8');


/* end of ROUTES and how to import routes */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(flash());

app.use(session({
    secret: "ThisShouldBeSecret",
    resave: false,
    saveUninitialized: false
}));

/* Routes used by the project */

app.use('/', layout);
app.use('/ereunitis', ereunitis);
app.use('/ergo', ergo);
app.use('/dieuthinsi', dieuthinsi);
app.use('/pedio', pedio);
app.use('/organismos', organismos);
app.use('/paradoteo', paradoteo);
app.use('/programma', programma);
app.use('/stelexos', stelexos);
app.use('/z2', z2);
app.use('/z22', z22);
app.use('/z3', z3);
app.use('/z4', z4);
app.use('/z5', z5);
app.use('/z6', z6);
app.use('/z7', z7);
app.use('/z8', z8);


/* End of routes used by the project */

// In case of an endpoint does not exist must return 404.html
app.use((req, res, next) => { res.status(404).render('404.ejs', { pageTitle: '404' }) })

module.exports = app;