var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var csv = require('fast-csv');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = 9000;

var databaseFile = "./bank_branches.csv";

var stream = fs.createReadStream(databaseFile);
 
console.log("reading data and storing it to memory");
var databaseData = {};
var csvStream = csv()
    .on("data", function(data){
         // console.log(data);
         databaseData[data[0]] = {
         	"ifsc"     :data[0],
         	"bank_id"  :data[1],
         	"branch"   :data[2],
         	"address"  :data[3],
         	"city"     :data[4],
         	"district" :data[5],
         	"state"    :data[6],
         	"bank_name":data[7],
         }
    })
    .on("end", function(){
        console.log("data read, now you can perform the queries. Number of records=",Object.keys(databaseData).length);
    });
 
stream.pipe(csvStream);

app.get('/bank/search/byIFSC/:ifsc', (req,res) => {
	var ifsc = req.params.ifsc;

	if(!ifsc)
		return res.status(400).send("ifsc code not provided");

	if(databaseData.hasOwnProperty(ifsc))
		return res.status(200).send(databaseData[ifsc])
	else{
		return res.status(400).send("No Results found for given IFSC Code");
	}

})

app.get('/bank/search/byBankNameAndCity/:bankname/:city', (req,res) => {
	var bank_name = req.params.bankname;
	var city = req.params.city;

	if(!bank_name || ! city)
		return res.status(400).send("Please give Bank Name and City!");

	var banks = [];
	for(var ifsc in databaseData){
		if(databaseData[ifsc].bank_name == bank_name && databaseData[ifsc].city == city){
			banks.push(databaseData[ifsc]);
		}
	}
	res.status(200).send(banks);
})

app.listen(process.env.PORT || 3000);

console.log("the app is running on",process.env.PORT || 3000);

module.exports = app;