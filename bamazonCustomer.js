var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
var tPrice;

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

var repeat = function repeat() {
  inquirer.prompt([
  {
    type: confirm,
    name: confirm,
    message: "Would you like to continue shopping?"
  }
]).then(function (user) {
  if (user.confirm === true) {
    show();
    run();
  } else {
    console.log("Have a nice day!");
  }
});
}

var show = function show() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    // connection.end();
  });
}

var run = function run() {

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    inquirer.prompt([

      {
        type: "list",
        name: "product",
        choices: function () {
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

    ]).then(function (answer) {

      // console.log("You want " + user.product + ".");
      // console.log("You want " + user.quantity + " of them.");
      // console.log("Your total comes to " + total);

      var item;
      var price = [];
      price.push(parseInt(answer.quantity));


      for (var i = 0; i < res.length; i++) {
        if (res[i].product_name === answer.product) {
          item = res[i];
          price.push(res[i].price);
          tPrice = price[0] * price[1];
        }
      }

      if(item.stock_quantity > parseInt(answer.quantity)) {
        connection.query("UPDATE products SET ? WHERE ?", [
          {
            stock_quantity: item.stock_quantity - answer.quantity
          },
          {
            id: item.id
          }], function (err) {
            if (err) throw err;
            console.log("You purchased " + answer.quantity + " " + item.product_name);
            console.log("Your total is: " + tPrice);
            // console.log(answer.confirm);
            // show();
            // run();
            // repeat();
            connection.end();
          })
      } else {
        console.log("Sorry, not enough for you!");
        // show();
        // run();
        // repeat();
        connection.end();
      }
     
    });
  });
};

show();
run();