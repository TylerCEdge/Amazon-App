var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}

inquirer.prompt([
  
  {
    type: "input",
    name: "product",
    message: "What would you like to buy?"
  },

  {
    type: "input",
    name: "quantity",
    message: "How many do you want?"
  }

]).then(function(user) {

console.log("You want " + user.product + ".");
console.log("You want " + user.quantity + " of them.");
  
});