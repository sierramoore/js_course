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


    if(pathName === '/products' || pathName === '/') {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(`this is the products page`);

    } else if(pathName === '/laptop' && id < laptopData.length) { // and exists

        res.writeHead(200, {'Content-type': 'text/html'});

        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {

            const laptop = laptopData[id];
            let output = data.replace(/{%PRODUCTNAME%}/g, laptop.productName);
            // replace quotes with //g to make regular expression
            output = output.replace(/{%IMG%}/g, laptop.image);
            output = output.replace(/{%IMG%}/g, laptop.image);
            output = output.replace(/{%PRICE%}/g, laptop.price);
            output = output.replace(/{%SCREEN%}/g, laptop.screen);
            output = output.replace(/{%CPU%}/g, laptop.cpu);
            output = output.replace(/{%STORAGE%}/g, laptop.storage);
            output = output.replace(/{%RAM%}/g, laptop.ram);
            output = output.replace(/{%DESCRIPTION%}/g, laptop.description);

            //send response back
            res.end(output);

        }); //sync vs will block code while executing
        // have access to data bc readFile will fetch data and in callback have access to data

    } else {

        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('url wasnt found on server');
    }
});

server.listen(1337, '127.0.0.1', () =>{
    console.log('listening for requests')
});