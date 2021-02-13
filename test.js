const fs = require('fs');

fs.readFile('./test.json', (err, data) => {
    var data = JSON.parse(data);

    data['testValue'] = 2;
    fs.writeFile('./test.json', JSON.stringify(data, null, 4), (err) => {

    });
});