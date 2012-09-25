

exports.stopCodeMap = (function() {
	return {
		MISSION_24_ST: 587,
		BAYFAIR      : 367,
		CONCORD      : 886,
		DALYCITY     : 747,
		DUBLIN_PLEAS : 920,
		EMBARCADERO  : 1354,
		FREMONT      : 917,
		MILLBRAE     : 764,
		MONTGOMERY   : 703
	}
}());

bartStopMap = new Array(
"16th St. Mission (SF)", 
"12th St. Oakland City Center",
"16th St. Mission (SF)",
"19th St. Oakland",
"24th St. Mission (SF)", 
"Balboa Park (SF)",
"Bay Fair (San Leandro)",
"Castro Valley",
"Civic Center/UN Plaza (SF)",
"Coliseum/Oakland Airport",
"Colma",
"Concord",
"Daly City",
"Downtown Berkeley",
"Dublin/Pleasanton",
"El Cerrito del Norte",
"El Cerrito Plaza",
"Embarcadero (SF)",
"Fremont",
"Fruitvale (Oakland)",
"Glen Park (SF)",
"Hayward",
"Lafayette",
"Lake Merritt (Oakland)",
"MacArthur (Oakland)",
"Millbrae",
"Montgomery St. (SF)",
"North Berkeley",
"North Concord/Martinez",
"Orinda",
"Pittsburg/Bay Point",
"Pleasant Hill/Contra Costa Centre",
"Powell St. (SF)",
"Richmond",
"Rockridge (Oakland)",
"San Bruno",
"San Francisco Intl Airport",
"San Leandro",
"South Hayward",
"South San Francisco",
"Union City",
"Walnut Creek",
"West Dublin/Pleasanton",
"West Oakland"
);

var stopCodeMap = exports.stopCodeMap;

getStationCode = function(stopName) {
	console.log ("FUNC: getStationCode. Arg " + stopName);
	if (stopName.indexOf ("24th St. Mission")) {
		return stopCodeMap.MISSION_24_ST;
	}
	else if (stopName.indexOf ("Bay Fair \(San Leandro\)" )) {
		return stopCodeMap.BAYFAIR;
	}

}