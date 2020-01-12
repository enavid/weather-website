const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectorPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

hbs.registerPartials(partialPath);

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectorPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'navid sadeghi',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Navid Sadeghi',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some text',
        title: 'Help',
        name: 'Navid sadeghi',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            });

        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        })
    }
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Naivd Sadeghi',
        errorMessage: 'Help article not found.'

    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Navid sadeghi',
        errorMessage: 'Page not found',
    })
})

app.listen(3000, () => {
    console.log('Server is up on 3000');
})