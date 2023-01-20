var http = require('http');
var url = require('url');
var fs = require('fs');
var csv = require('csv-parser');
const results=[];

const fName = ()=>{
        fs.createReadStream('sheet1.csv')
        .pipe(csv())
        .on('data',(data)=>results.push(data.URL))
}
fName();

http.createServer(function(req,res){
    var q = url.parse(req.url,true);
    var fileName ="."+q.pathname;
    console.log(fileName);
    var count=0;
    for(var i=0;i<results.length;i++){
        if(fileName == "./"+results[i]){
            count++;
            break;
        }
    }
    if(count==1){
        res.writeHead(200,{'Content-Type':'text/html'});
        return res.end("URL Loading Check Status : Success");
    }else{
        res.writeHead(404,{'Content-Type':'text/html'});
        return res.end("URL Loading Check Status : Failed");
    }
}).listen(5000);