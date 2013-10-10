var http = require('http');
var fs = require('fs');

var port = 3000;

http.createServer(basic).listen(port);
console.log('server listening on port ' + port);

function basic(req, res) {
  console.log(req.url);
  if (api[req.url]) {
    api[req.url](req, res);
  } else {
    static(req, res);
  }
}

function static(req, res) {
  var path = 'public' + req.url;

  console.log('looking for ' + path);

  fs.stat(path, function (err, stats) {
    if (err) return notFound(res);
    if (stats.isDirectory()) path = path + 'index.html';

    fs.readFile(path, function (err, data) {
      if (err) return notFound(res);

      res.writeHead(200);
      res.end(data);
    });
  });
}

function notFound(res) {
  res.writeHead(404);
  res.end('Not Found');
}


var api = {
  '/flavors': flavors,
  '/addFlavor': test2
};

var flavors = ['chocolate'];

function flavors(req, res) {
  res.writeHead(200);
  res.end(JSON.stringify(flavors));
}

function test2(req, res) {
  var body = '';
  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    console.log(body);
    res.end('ok');
  });
}
