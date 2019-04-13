var mysql = require("mysql");
var inquirer = require("inquirer");
var console_table = require("console.table");

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
});

var show = function show() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}

var run = function run() {

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    inquirer.prompt([

      {
        type: "list",
        name: "product",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].product_name);
          }
          return choiceArray;
        },
        message: "What would you like to buy?"
      },
    
      {
        type: "input",
        name: "quantity",
        message: "How many do you want?"
      }
    
    ]).then(function (user) {
    
      console.log("You want " + user.product + ".");
      console.log("You want " + user.quantity + " of them.");
    
    });
  });

}

show();
run();

