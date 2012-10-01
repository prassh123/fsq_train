
var querystring = require('querystring');
var https = require('https');
var fsq_access_token = '';

exports.foursquareredirect = function (req, res) {
  res.redirect('https://foursquare.com/oauth2/authenticate?client_id=DX3VVQM0L0YQ2OHTV1N5GNC5QTXCQFXDI0131W3WTIV02JVU&response_type=token&redirect_uri=https://rocky-eyrie-3850.herokuapp.com/foursquarecallback');
};


exports.foursquarecallback = function (req, res) {
  console.log ('In foursquare callback');
  //accessToken =  window.location.hash.substring(1); 
  //console.log ('access token ' + accessToken);
  //res.send ("Foursquare callback "  + accessToken );
  res.render ('fscallback',{layout:false, title: 'callback'});
  return;
};


exports.foursquareaccesstoken = function(req, res) {
    var params = req.param ('access_token', null);
    console.log ('came to foursquareaccesstoken with token ' );
    fsq_access_token = params;
    res.send ('foursquare token saved successfully ' + fsq_access_token);
};

exports.foursquarecallbackpush = function(req, res) {
    console.log (req.headers);
    console.log ('Foursquare push notification post body:'+JSON.stringify(req.body)); 
    var checkin = JSON.parse(req.body.checkin);
    var checkin_id = checkin.id;
    var venue = checkin.venue.name;
    console.log ('Checkin location: ' + venue);
    console.log ('Checkin ID: ' + checkin_id);

    var user = JSON.parse(req.body.user);
   
    var custEmail = user.contact.email;
    console.log ('Client email: ' + custEmail);
   
    try {
      console.log ('using access token ' + fsq_access_token);

      var stopName = getBestLocation(venue);

      var post_data = querystring.stringify(
          {
            "text":"Upcoming BART trains. Please click here.",
            "url" : "http://rocky-eyrie-3850.herokuapp.com/departures/stopname/" + stopName 
          }
      ); 

      var urlstr = '/v2/checkins/'+checkin_id+'/reply?oauth_token='+fsq_access_token+'&v=20120928';
	  var options = {
	    host: "api.foursquare.com",  
	    path: urlstr,
	    method: 'POST',
        headers:  {
                   'Content-Type': 'application/x-www-form-urlencoded',
                   'Content-Length': post_data.length
               }
	  };
     
      var resp = '';
	  console.log ('about to make a foursquare http POST request');
	  var post_req = https.request(options, function(res) {
	                       console.log('STATUS: ' + res.statusCode);
	                       //console.log('HEADERS: ' + JSON.stringify(res.headers));
	                       //res.setEncoding('utf8');
	                       res.on('data', function (chunk) {
		                        resp += chunk;
	                       });
	                       res.on('end', function(){
		                      console.log ('In end response' + resp );
	                       });  	
	                 });

      post_req.write(post_data);
      post_req.end();

    } catch(err) {
        console.log(err);   
    }
    res.end();
};

getBestLocation = function(venue) {
    if (venue.indexOf("Fremont BART") >= 0) {
        console.log ('returning fremont');
        return "Fremont";
    }
    else if (venue.indexOf("Concord BART") >= 0) {
        console.log ('returning Concord');
        return "Concord";
    }
}
