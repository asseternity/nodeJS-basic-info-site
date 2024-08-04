#!/usr/bin/env node

const url = require('url');
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {
    let q = url.parse(req.url, true);
    let filename = "." + q.pathname + ".html";

    if (q.pathname === "/") {
        fs.readFile('./index.html', function(indexPageError, indexPage) {
            if (indexPageError) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end('404 Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(indexPage);
            }
        })
    } else {
        fs.readFile(filename, function(err, data) {
            if (err) {
                fs.readFile('./404.html', function(errorPageError, errorPage) {
                    if (errorPageError) {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        return res.end('404 Not Found');
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        return res.end(errorPage);
                    }
                });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(data);    
            }
        });    
    }
}).listen(8080);