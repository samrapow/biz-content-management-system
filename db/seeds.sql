
INSERT INTO department (name)
VALUES ("Corporate Strategy"), ("Innovation Lab"), ("US Card"), ("Retail Bank"), ("Financial Services");

INSERT INTO role (title, salary, department_id)
VALUE ("Invicta Manager", 150000.00, 2), ("Director", 210000.00, 1), ("Principal Engineer", 140000.00, 5), ("Scrum Master", 95000.00, 3), ("President", 1500000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Sam", "Weinstein", 1, 2), ("Michael", "Moss", 2, 5), ("Josh", "Petes", 3, 2), ("Mia", "Rod", 4, 2), ("Poor", "Badbank", 5, 5);