/*
 * GET home page.
 */
var http = require('http');
var libxmljs = require("libxmljs");
var url =  require('url');

var stopCodeMap = require('./utils');


exports.index = function(req, res){
  console.log ('in exports index');
  res.render('index', { title: 'Schedule app' });
  //res.send ('Guess this uses layouts'); 
};

exports.getNextDeparturesByStopName = function(req, res) {
	console.log ('Function: getNextDeparturesByStopName '  );
	
	var urlparts = url.parse (req.url);
	console.log ('parts' + JSON.stringify(urlparts));
	stopName = '';
	
	if (urlparts.pathname != null) {
		var partsArr =  urlparts.pathname.split("/");
		if (partsArr[3] != null) {
			stopName = partsArr[3];
		}
		//console.log (partsArr[4]);
		// Append anything after partsArr[3] to the stopName string
		var i = 4;

		while (typeof partsArr[i] != 'undefined') {
		    stopName += '/'+ partsArr[i++];	
		}
	}
   
    console.log ('Stop Name' + JSON.stringify(stopName));	
    
    var stopCode = getStationCode(stopName);
	var xmlResp = '';
	try {
    var urlstr = '/Transit2.0/GetNextDeparturesByStopName.aspx?token=1ebf976b-01bb-46d5-a8df-3978ee55d235&agencyName=BART&stopName=' + encodeURIComponent(stopName);

      
	var options = {
	  host: "services.my511.org",  
	  path: urlstr,
	  method: 'GET'
	};
	console.log ('about to make a http request');
	http.request(options, function(res) {
	  console.log('STATUS: ' + res.statusCode);
	  //console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
		xmlResp += chunk;
	  });
	  res.on('end', function(){
		console.log ('In end response');
		processResp(xmlResp);
	  });  	
	}).end();


	
	processResp = function (xmlResp) {
		//console.log ('In func: processResp ' + xmlResp);
		res.setHeader("Content-Type", "text/html");
		var xmlDoc = libxmljs.parseXmlString(xmlResp);
		routes = xmlDoc.find("//Route");
        
		objArr = [];
		for (var i=0; i<routes.length; i++) {
			stationObj = new Object();
			console.log('Station: ' + routes[i].attr('Name').value());
			stationObj.name = routes[i].attr('Name').value();
			
			var time = routes[i].find (".//DepartureTime");
			depTimes = [];
			if (time.length > 0) {
				for(var j=0; j<time.length; j++) {				
					depTimes.push (time[j].text());
				}
			}
			console.log ('Dep times ' + depTimes);
			stationObj.depTimes = depTimes;
			objArr.push(stationObj);
		}		
		console.log (objArr);

		res.render('index', {stopname: decodeURIComponent(stopName), data: objArr});	
		res.end();
	}
} catch (err) {
	console.log(err);
  }
}


