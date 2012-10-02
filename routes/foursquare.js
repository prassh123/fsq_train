
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
    if (venue.indexOf("16th St. Mission BART") >= 0) {
        console.log ('returning 16th St. Mission (SF)');
        return "16th St. Mission (SF)";
    }
    else if (venue.indexOf("12th St. Oakland City Center BART") >= 0) {
        console.log ('returning 12th St. Oakland City Center');
        return "12th St. Oakland City Center";
    }
    else if (venue.indexOf("16th St. Mission BART") >= 0) {
        console.log ('returning 16th St. Mission (SF)');
        return "16th St. Mission (SF)";
    }
    else if (venue.indexOf("19th St. Oakland BART") >= 0) {
        console.log ('returning 19th St. Oakland');
        return "19th St. Oakland";
    }
    else if (venue.indexOf("24th St. Mission BART") >= 0) {
        console.log ('returning 24th St. Mission (SF)');
        return "24th St. Mission (SF)";
    }
    else if (venue.indexOf("Balboa Park BART") >= 0) {
        console.log ('returning Balboa Park (SF)');
        return "Balboa Park (SF)";
    }
    else if (venue.indexOf("Bay Fair BART") >= 0) {
        console.log ('returning Bay Fair (San Leandro)');
        return "Bay Fair (San Leandro)";
    }
    else if (venue.indexOf("Castro Valley BART") >= 0) {
        console.log ('returning Castro Valley');
        return "Castro Valley";
    }
    else if (venue.indexOf("Civic Center/UN Plaza BART") >= 0) {
        console.log ('returning Civic Center/UN Plaza (SF)');
        return "Civic Center/UN Plaza (SF)";
    }
    else if (venue.indexOf("Coliseum/Oakland Airport BART") >= 0) {
        console.log ('returning Coliseum/Oakland Airport');
        return "Coliseum/Oakland Airport";
    }
    else if (venue.indexOf("Colma BART") >= 0) {
        console.log ('returning Colma');
        return "Colma";
    }
    else if (venue.indexOf("Concord BART") >= 0) {
        console.log ('returning Concord');
        return "Concord";
    }
    else if (venue.indexOf("Daly City BART") >= 0) {
        console.log ('returning Daly City');
        return "Daly City";
    }
    else if (venue.indexOf("Downtown Berkeley BART") >= 0) {
        console.log ('returning Downtown Berkeley');
        return "Downtown Berkeley";
    }

    else if (venue.indexOf("West Dublin/Pleasanton BART") >= 0) {
        console.log ('returning West Dublin/Pleasanton');
        return "West Dublin/Pleasanton";
    }
    
    else if (venue.indexOf("Dublin/Pleasanton BART") >= 0) {
        console.log ('returning Dublin/Pleasanton');
        return "Dublin/Pleasanton";
    }
    else if (venue.indexOf("El Cerrito del Norte BART") >= 0) {
        console.log ('returning El Cerrito del Norte');
        return "El Cerrito del Norte";
    }
    else if (venue.indexOf("El Cerrito Plaza BART") >= 0) {
        console.log ('returning El Cerrito Plaza');
        return "El Cerrito Plaza";
    }
    else if (venue.indexOf("Embarcadero BART") >= 0) {
        console.log ('returning Embarcadero (SF)');
        return "Embarcadero (SF)";
    }
    else if (venue.indexOf("Fremont BART") >= 0) {
        console.log ('returning fremont');
        return "Fremont";
    }
    else if (venue.indexOf("Fruitvale BART") >= 0) {
        console.log ('returning Fruitvale (Oakland)');
        return "Fruitvale (Oakland)";
    }
    else if (venue.indexOf("Glen Park BART") >= 0) {
        console.log ('returning Glen Park (SF)');
        return "Glen Park (SF)";
    }

    else if (venue.indexOf("South Hayward BART") >= 0) {
        console.log ('returning South Hayward');
        return "South Hayward";
    }

    else if (venue.indexOf("Hayward BART") >= 0) {
        console.log ('returning Hayward');
        return "Hayward";
    }    
    else if (venue.indexOf("Lafayette BART") >= 0) {
        console.log ('returning Lafayette');
        return "Lafayette";
    }        
    else if (venue.indexOf("Lake Merritt BART") >= 0) {
        console.log ('returning Lake Merritt (Oakland)');
        return "Lake Merritt (Oakland)";
    }  
    else if (venue.indexOf("MacArthur BART") >= 0) {
        console.log ('returning MacArthur (Oakland)');
        return "MacArthur (Oakland)";
    }           
    else if (venue.indexOf("Millbrae BART") >= 0) {
        console.log ('returning Millbrae');
        return "Millbrae";
    }         
    else if (venue.indexOf("Montgomery St. BART") >= 0) {
        console.log ('returning Montgomery St. (SF)');
        return "Montgomery St. (SF)";
    }     
    else if (venue.indexOf("North Berkeley BART") >= 0) {
        console.log ('returning North Berkeley');
        return "North Berkeley";
    }     
    else if (venue.indexOf("North Concord/Martinez") >= 0) {
        console.log ('returning North Concord/Martinez');
        return "North Concord/Martinez";
    }      
    else if (venue.indexOf("Orinda BART") >= 0) {
        console.log ('returning Orinda');
        return "Orinda";
    }     
    else if (venue.indexOf("Pittsburg/Bay Point BART") >= 0) {
        console.log ('returning Pittsburg/Bay Point');
        return "Pittsburg/Bay Point";
    }   
    else if (venue.indexOf("Pleasant Hill/Contra Costa Centre BART") >= 0) {
        console.log ('returning Pleasant Hill/Contra Costa Centre');
        return "Pleasant Hill/Contra Costa Centre";
    }
    else if (venue.indexOf("Powell St. BART") >= 0) {
        console.log ('returning Powell St. (SF)');
        return "Powell St. (SF)";
    }
    else if (venue.indexOf("Richmond BART") >= 0) {
        console.log ('returning Richmond');
        return "Richmond";
    }
    else if (venue.indexOf("Rockridge BART") >= 0) {
        console.log ('returning Rockridge (Oakland)');
        return "Rockridge (Oakland)";
    }
    else if (venue.indexOf("San Bruno BART") >= 0) {
        console.log ('returning San Bruno');
        return "San Bruno";
    }
    else if (venue.indexOf("San Francisco Int'l Airport BART") >= 0) {
        console.log ('returning San Francisco Int\'l Airport');
        return "San Francisco Int\'l Airport";
    }
    else if (venue.indexOf("San Leandro BART") >= 0) {
        console.log ('returning San Leandro');
        return "San Leandro";
    }
    
    else if (venue.indexOf("South San Francisco BART") >= 0) {
        console.log ('returning South San Francisco');
        return "South San Francisco";
    }
    else if (venue.indexOf("Union City BART") >= 0) {
        console.log ('returning Union City');
        return "Union City";
    }
    else if (venue.indexOf("Walnut Creek BART") >= 0) {
        console.log ('returning Walnut Creek');
        return "Walnut Creek";
    }
    
    else if (venue.indexOf("West Oakland BART") >= 0) {
        console.log ('returning West Oakland');
        return "West Oakland";
    }
    else {
        return "";
    }
}
