var glimpse = require('@glimpse/glimpse');

glimpse.init();

var express = require('express');
var bodyParser = require('body-parser');
var faker = require('faker');

var app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// cors
app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', req.get('origin'));
    res.set('Access-Control-Allow-Credentials','true');
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    next();
});

// root route
app.get('/', function (req, res) {
    res.send('Up and running');
});

// a nice simple response that should work just fine
app.all('/good', function (req, res) {
    res.json({
        hello: 'world'
    });
});

// our problematic response
app.all('/bad', function (req, res) {

    var counter = 0;
    var maxDepth = 4;

    var types = ['example1', 'example2'];

    var createItem = function (depth, index) {

        var type = types[0],
            name = faker.company.companyName(),
            childrenCount = Math.ceil(Math.random() * 5);

        if (index === 0) {
            // use a single child for the first item
            childrenCount = 1;
        }

        if (depth >= maxDepth) {
            // stop creating children
            childrenCount = 0;
            // switch to other type
            type = types[1];
        }

        // set to root
        if (depth === 0) {
            name = 'Root';
            type = 'RootCompany';

            childrenCount = 20; // make it huge!
        }

        var data = {
            id: counter++,
            name: name,
            type: type,
            // set allowedFilenameExtensions only on leaf nodes
            allowedFilenameExtensions: childrenCount > 0 ? [] : faker.random.arrayElement([
                ['DOC', 'PDF', 'TXT', 'XLS', 'XML'], // Sometimes allow 'xls' and 'xml'
                ['DOC', 'PDF', 'TXT'],
                [] // Sometimes allow all extensions
            ]),
            folder: {
                name: name,
                creationDate: faker.date.past(),
                value1: Math.round(faker.random.number()),
                value2: Math.round(faker.random.number()),
                value3: Math.round(faker.random.number()),
                description: faker.lorem.paragraph(),
                isFavorite: faker.random.boolean(),
                important: faker.random.boolean(),
                lastModificationDate: faker.date.past(),
                lastModificationType: Math.floor(Math.random() * 4)
            },
            children: []
        };

        for (var i = 0; i < childrenCount; i++) {
            data.children.push(createItem(depth + 1, i + index));
        }

        return data;
    };

    var payload = {
        'data' : createItem(0, 0)
    };

    res.json(payload);

});

// start app
app.listen(3000, function () {
    console.log('Mock is running on port 3000');
});