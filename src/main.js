let restify = require('restify');

const respond = (req, res, next) => {
  res.send('こんにちは' + req.params.name);
  next();
}

let server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.get('/', function(req, res, next) {
  res.send('home')
  return next();
});

server.post('/foo',
  function(req, res, next) {
    req.someData = 'foo';
    return next();
  },
  function(req, res, next) {
    res.send(req.someData);
    return next();
  }
);

server.listen(8080, () => {
  console.log('%s listeng at %s', server.name, server.url);
});