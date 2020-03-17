const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8'); // okay to be blocking bc only happens once on start
const laptopData = JSON.parse(json);

// each time someone access it this will excute
const server = http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname;
    // ids and spefic pages
    const id = url.parse(req.url, true).query.id; //.query has anything inputed in url path

    // PRODUCT OVERVIEW
    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, {'Content-type': 'text/html'});

        // get background
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;

            // get all cards
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
                // loop over each card and insert data into placeholders (el is current el in laptop data array)
                const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput); // replace current item of filled in data in html
                res.end(overviewOutput);

            });
        });

        // LAPTOP DETAIL
    } else if (pathName === '/laptop' && id < laptopData.length) { // and exists

        res.writeHead(200, {'Content-type': 'text/html'});

        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {

            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);


            //send response back
            res.end(output);

        }); //sync vs will block code while executing
        // have access to data bc readFile will fetch data and in callback have access to data
    }


    // IMAGES
    //if any of these extentions exist in our route, read img from file system and send res to browser
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
        fs.readFile(`${__dirname}/data/img/${pathName}`, (err, data) => {
            res.writeHead(200, {'Content-type': 'img/jpg'});
            res.end(data);
        })

    // URL NOT FOUND
    }else {

        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('url wasnt found on server');
    }
});

server.listen(1337, '127.0.0.1', () =>{
    console.log('listening for requests')
});

function replaceTemplate(originalHtml, laptop) {
    // replace quotes with //g to make regular expression
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMG%}/g, laptop.image);
    output = output.replace(/{%IMG%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);

    return output;
}