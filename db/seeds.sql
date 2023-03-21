USE employee_management_db;

-- department
INSERT INTO department(name)
VALUES
    -- sales
    ("Sales"),
    -- engineers & designer
    ("Development"),
    -- Ad, acct, & legal
    ("Advertisement & PR"),
    ("Finance"),
    ("Legal");

-- role
INSERT INTO role(title, salary, department_id)
VALUES
    -- title, salary, & id
    -- sales
    ("Sales Lead", 100000, 1),
    ("Salesperson", 60000, 1),
    -- engineers & designer
    ("Lead Engineer", 150000, 2),
    ("Backend Engineer", 125000, 2),
    ("Front-End Designer", 125000, 2),
    -- Ad, acct, & legal
    ("Advertisement & PR", 80000, 3),
    ("Accountant", 125000, 4),
    ("Legal Advisor", 150000, 5);

-- employee
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
-- first, last, id, manager/NULL
-- another employee that is the manager of the current employee 
-- null if the employee has no manager
    -- sales
    ("Sarah", "Smith", 1, NULL),
    ("Joe", "Jennings", 2, 1),
    -- engineers & designer
    ("Cindy", "Sue", 3, NULL),
    ("Carlos", "Camacho", 4, 3),
    ("Mica", "Miranda", 5, 3),
    -- Ad, acct, & legal
    ("Rick", "Rocha", 6, NULL),
    ("Simone", "Sequiera", 7, NULL),
    ("Daniel", "Cohen", 8, NULL);
