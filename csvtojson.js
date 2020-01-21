const str = `Campaign ID,Location,Conversion category,Conversion name,All conv.,All conv. value,Conversions
8744893582,2840,Download,Word Crush (Android) first_open_af,186.00,0.00,0.00
8747424132,2840,Download,Word Crush (Android) first_open_af,342.00,0.00,0.00
8747424132,2840,Download,Word Crush (Android) First Open,462.00,0.00,458.00
8744893582,2840,Download,Word Crush (Android) First Open,521.00,0.00,520.00
8744893582,2840,Other,Word Crush (Android) video_complete,3325.00,0.00,0.00
8744893582,2840,Other,Word Crush (Android) first_pay,3.00,0.00,0.00
8747424132,2840,Other,Word Crush (Android) video_complete,3867.00,0.00,0.00
8747424132,2840,Other,Word Crush (Android) first_pay,4.00,0.00,0.00`;
const csv = require('csvtojson');

csv({ noheader: false, flatKeys: true, output: 'json' }).fromString(str).then(jsonRow => {
    console.log(` jsonRow:`, jsonRow);
})

// const csvFilePath='./csvtojson.json';
// csv()
// .fromFile(csvFilePath)
// .then((jsonObj)=>{
// 	console.log(jsonObj);
// 	/**
// 	 * [
// 	 * 	{a:"1", b:"2", c:"3"},
// 	 * 	{a:"4", b:"5". c:"6"}
// 	 * ]
// 	 */ 
// })