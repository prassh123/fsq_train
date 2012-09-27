
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

   // var orderItem = checkin.shout;
   // console.log ('Ordered item: ' + orderItem);
   
    var user = JSON.parse(req.body.user);
   
   // var custPhoneNumber = user.contact.phone;
   // console.log ('Client phone: ' + custPhoneNumber);

    var custEmail = user.contact.email;
    console.log ('Client email: ' + custEmail);

    var orderDetails = "<h3>Venue: " + venue +  "Customer email" + custEmail ;
    //orders.push({customer: {email: custEmail, phone: custPhoneNumber}, order: {item: orderItem, placed: new Date(), delivered: null}});
    //sendsms_fn('+14083291685',custPhoneNumber,orderItem+" has been ordered!");
    res.send ('Order via FourSquare Successful! ' + orderDetails);
};

