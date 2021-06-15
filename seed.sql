INSERT INTO Departments (name)
VALUES ('Manager'), ('Sales'), ('Engineer'), ('Accounting');

INSERT INTO Roles (title, salary, department_id)
VALUES ('Sales Manager', 200000, 1), ('Head Engineer', 250000, 2), ('Junior Sales', 100000, 3), ('Accountant', 500000, 5);

INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ('David','Nelson', 1, NULL), ('Ric', 'Flair', 2, NULL), ('John', 'John', 3, NULL), ('Ricky', 'Lake', 4, NULL);