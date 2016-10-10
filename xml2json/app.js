var parser = require('xml2json');
var fs = require('fs');

var xml_file = 'inforcenter';

var xml = fs.readFileSync('./' + xml_file + '.xml', 'utf8');

fs.open("./" + xml_file + ".json", "w", function(err, fd) {
	if (err) console.error(err);

	var json = parser.toJson(xml); //returns a string containing the JSON structure by default
	console.log(json);

	fs.write(fd, json, 0, 'utf8', function(e) {
		if (e) console.error(e);
		console.log("write over...");
		fs.closeSync(fd);
	});
});