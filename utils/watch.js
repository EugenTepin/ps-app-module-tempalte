const fs = require('fs');
const browserify = require('browserify');
const watchify = require('watchify');
const jsonfile = require('jsonfile');
const mustache = require('mustache');

var path = 'package.json';
var packageJson = jsonfile.readFileSync(path);


var app = browserify({
    entries: ['./test.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
});

app.on('update', appBundle);
appBundle();

app.on('log', console.error);

function appBundle() {
    app.bundle()
        .on('error', console.error)
        .pipe(fs.createWriteStream('./build/test_bundle.jsx'));
}


var b = browserify({
    entries: ['./index.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
});

b.on('update', moduleBundle);
b.on('log', console.error);

moduleBundle();

function moduleBundle() {
    var bundle = mustache.render(fs.readFileSync('./header.jsx').toString(), packageJson);
    b.require('./index.js', { expose: packageJson.name })
        .bundle()
        .on('error', console.error)
        .on('data',(chunk) => {bundle+=chunk})
        .on('end',()=> {
            fs.writeFileSync('./build/' + packageJson.name + '.jsx', bundle);
        })

    
}