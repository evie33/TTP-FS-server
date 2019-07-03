To run this project:
git clone:
https://github.com/evie33/TTP-FS-server
in terminal project folder : 
npm install 
npm run seed  
npm start

git clone:
https://github.com/evie33/TTP-FS-client
in terminal project folder : 
npm install 
npm start


In this project:

User able to create a new account with name, email and password
* user's default cash balance $5000.00
* email can only register once

User able to authenticate via email and password to access the personal account

User able to buy stock at current price by specifying its ticker symbol and number of shares 
*user can only buy whole number of shares
*user can only buy shares if they have enough cash in the accout
*user can only view and buy share if ticker symbol is valid

User able to view a list of all transactions made to date

User able to view a list of all stock own along with their current value 
* current value are based on the latest price and quantity owned for a given stock

User able to check the stock at its current price change dynamically to indicate its daily performance
*display red when current price is less than day's open price
*display grey when current price is equal to the days's open price 
*display green when current price is greathen than the day's open price


