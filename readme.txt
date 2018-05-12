RestAPI Using NodeJS with Express framework.
Takes IFSC, BankName, City to give all branch details.

Two ways to use
http://localhost:3000/bank/search/byIFSC/{IFSC}
http://localhost:3000/bank/search/byBankNameAndCity/{BANK NAME}/{CITY}

Example:
by IFSC:
http://localhost:3000/bank/search/byIFSC/HDFC0000001
by Bank Name & City
http://localhost:3000//bank/search/byBankNameAndCity/HDFC%20BANK/MUMBAI

For running the server :
run "node server.js"
