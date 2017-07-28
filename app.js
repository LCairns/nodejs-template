const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const config = require('./config.js');

// To Move
const markdown = require('marked');
markdown.setOptions({
    renderer: new markdown.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});
const fs = require('fs');

const app = express();

app.set('views', path.join(__dirname, 'app/views'));
app.engine('html', handlebars({
    defaultLayout: 'main',
    extname: '.html',
    layoutsDir: 'app/views/layouts/',
    partialsDir: 'app/views/partials/'
}));
app.set('view engine', 'html');
app.use(express.static('build'));

// To Move
app.get('/', (req, res) => {
    res.render('home', {
        'application-name': 'Application Name',
        'header': 'Home'
    });
});

app.get('/blog', (req, res) => {
    const content = fs.readFileSync('./app/content/blog.md');
    res.render('blog', {
        'application-name': 'Application Name',
        'header': 'Blog',
        'content': markdown(content.toString())
    });
});
// --

app.listen(config.PORT, () => {
    console.log(`Listening on port: ${config.PORT} - Press CTRL+C to exit`);
});