connect=require('connect');
serveStatic=require('serve-static');
var app=connect();
app.use(serveStatic("www"));
app.listen(8008);
