/**
 * Created by francizidar on 01/03/16.
 */


var page = require('webpage').create();
var system = require('system');

var address = system.args[1];
var from = system.args[2];
var to = system.args[3];

console.log(address, from, to);

page.open('http://migrant.je.djnd.si/jjansasds?from=migrant&to=%C5%BEid', function (status) {
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit(1);
    } else {


            page.viewportSize = { width: 1440, height: 900 };

            var clipRect = page.evaluate(function(){
                return document.querySelector('.permalink-tweet').getBoundingClientRect();
            });

            page.clipRect = {
                top:    clipRect.top,
                left:   clipRect.left,
                width:  clipRect.width,
                height: clipRect.height
            };

            page.render('capture.png');

            phantom.exit();

    }
});