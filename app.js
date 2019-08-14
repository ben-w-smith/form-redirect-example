const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')

const app = express()

// keeps track of score in this app
// probably wise to use something user specific like $_SESSION['score'] in php
let score = 0;

app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Homepage'
    })
})

app.post('/', function(req, res, next) {
    // score is a global variable in this app
    score = req.body.example
    res.redirect('/submitted')
})

app.get('/submitted', function(req, res, next) {
    let score_to_message = {
        1: 'Hard pass',
        2: 'Bad',
        3: 'Meh',
        4: 'Good',
        5: 'Excellent',
    }
    res.render('submitted', {
        'message': score_to_message[score],
    })
})

app.listen(3000)