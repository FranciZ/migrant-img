var express = require('express');
var app     = express();

var exec    = require('child_process').exec;
var cmd     = 'phantomjs tweet.js';

exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
});

app.use('/images', express.static('./images'));


app.get('/:user/status/:id', function(req, res){

    var twitterUser = req.params.user;
    var twitId = req.params.id;
    var oldWord;
    var newWord = 'žid';

    if(req.query.migrant){
        oldWord = 'migrant';
        newWord = req.query.migrant;
    }


    if(req.query.from && req.query.to){

        oldWord = req.query.from;
        newWord = req.query.to;

    }

    var cmd = 'phantomjs tweet.js '+twitterUser+' '+twitId+' '+oldWord+' '+newWord;
    var cmd2 = 'phantomjs tweet-original.js '+twitterUser+' '+twitId;

    var steps = 0;

    console.log(cmd);

    exec(cmd, function(error, stdout, stderr) {


        steps++;
        if(steps === 2){
            complete();
        }

    });

    exec(cmd2, function(error, stdout, stderr) {

        steps++;
        if(steps === 2){
            complete();
        }

    });

    function complete(){

        var img = '<img src="/images/'+twitId+'.png">';
        var img2 = '<img src="/images/'+twitId+'-original.png">';

        var body = '<!DOCTYPE html><html>'+img+img2+'</html>';

        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'text/html; charset=utf-8'
        });

        res.write(body);
        res.end();

    }


});



app.listen(3064, function(){

    console.log('Server listening on port 3064');

});