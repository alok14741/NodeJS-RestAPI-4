A simple REST api using express with nodejs which
1. Given a bank branch IFSC code, get branch details
2. Given a bank name and city, gets details of all branches of the bank in the city

The data used is from this repository -> https://github.com/snarayanank2/indian_banks


Setting up and running the code and the test cases
==============================================================================
(first cd into the folder)

For installing Dependencies : 
run "npm install"

For running the server :
run "node server.js"
then go to browser or postman or any service which you want to use and use the following APIs
1. GET http://localhost:3000/branchfromifsc?ifsc=<ifsc>
2. GET http://localhost:3000/branchesfromnameandcity?name=<bank_name>&city=<city>