DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(6,2) DEFAULT 0,
  stock_quantity INT DEFAULT 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HP Laptop", "Electronics", 499.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPod", "Electronics", 199.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pulp Fiction", "Movies", 19.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kill Bill Vol 1", "Movies", 14.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DeWalt Cordless Drill", "Hardware", 49.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Circular Saw", "Hardware", 99.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paper Plates 100 Count", "Household", 9.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pestle And Mortar", "Household", 19.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Batman T-Shirt", "Apparel", 19.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball Cap", "Apparel", 13.99, 10);

SELECT * FROM products;