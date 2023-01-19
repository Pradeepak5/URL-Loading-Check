var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req,res){
    var q = url.parse(req.url,true);
    var fileName ="."+q.pathname;
    fs.readFile(fileName,function(err,data){
        if(err){
            res.writeHead(404,{'Content-Type':'text/html'});
            console.log(err);
            return res.end("URL Loading Check Status : Failed");
        }
        res.writeHead(200,{'Content-Type':'text/html'});
        return res.end("URL Loading Check Status : Success");
    })
}).listen(5000);