var exports = module.exports = {};

exports.SWITCH_ON = "On";
exports.SWITCH_OFF = "Off";
exports.SWITCH = "Switch";
exports.SWITCH_BRIGHTNESS = "Brightness";
exports.THERMO_SET = 'Target Temperature';

var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var post_data = querystring.stringify({'' : ''});

exports.switchAction = function (idx, action){
	 var post_options = 
  {
      host: '192.168.0.7',
        port: '8081',
        path: '/json.htm?type=command&param=switchlight&idx='+idx+'&switchcmd='+action,
        method: 'GET',
        headers: 
        {
          'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };
    post(post_options);
}


exports.switchBrightness = function (idx, level){
  //32 = 100%
  var dimlevel = level / 3.125;
   var post_options = 
  {
      host: '192.168.0.7',
        port: '8081',
        path: '/json.htm?type=command&param=switchlight&idx='+idx+'&switchcmd=Set%20Level&level='+dimlevel,
        method: 'GET',
        headers: 
        {
          'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };
    post(post_options);
}

exports.setValue = function (idx, value){
   var post_options = 
  {
      host: '192.168.0.7',
        port: '8081',
        path: '/json.htm?type=command&param=udevice&idx='+idx+'&nvalue=0&svalue='+value,
        method: 'GET',
        headers: 
        {
          'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };
    post(post_options);
}



function post(post_options){

  // Set up the request
  var post_req = http.request(post_options, function(res) {
     // res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  console.log('req: '+post_data);

 // post the data
  post_req.write(post_data);
  post_req.end();
}