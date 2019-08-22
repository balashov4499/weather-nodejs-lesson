const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port= process.env.PORT || 3000;

//define paths for expres config
const publicDirect = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirect));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'andrew'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'andrew',
        title: 'about',
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'HELPPPPP'
    });
});


app.get('/weather', (req, res) => {
    let forecast1;
    let location1;
    if (!req.query.address) {
        return res.send({error: 'no address provided'});
    }
    geoCode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return console.log(error)
        }
        forecast(latitude, longitude, (error, forData) => {
            if (error) {
                return console.log(error)
            }
            res.send({
                forecast: (`${forData.resp.daily.data[0].summary} Currently ${forData.resp.currently.temperature} degrees. Rain chance ${forData.resp.currently.precipProbability}`),
                location,
                address: req.query.address
            });
        });
    });



});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        message: 'HELPPPPP 404'
    });
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({error: 'no search term'});
    }

    console.log(req.query);
    res.send({
        products: []
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        message: '404',
    });
});


app.listen(port, () => {
    console.log('server started on ' + port);
});
