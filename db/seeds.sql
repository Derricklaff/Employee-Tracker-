INSERT INTO department (name)
    VALUES ('SALES'),
        ('ENGINEERING'),
        ('FINANCE'),
        ('LEGAL');

INSERT INTO role (title, salary, department_id)
    VALUES ('Sales Lead', 100000, 1),
    ('Salesperson', 85000, 1),
    ('Lead Engineer', 135000, 2),
    ('Software Engineer', 95000, 2),
    ('Account Manager', 130000, 3),
    ('Accountant', 145000, 3),
    ('Legal Team Lead', 220000, 4),
    ('Attorney', 186000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('Jane', 'Doe', 1, NULL),
        ('James', 'Xalis', 2, 1),
        ('Miguel', 'Gallardo', 3, NULL),
        ('Morgan', 'Tolman', 4, 3),
        ('John', 'Doe', 5, NULL),
        ('Toacin', 'Patwary', 6, 5),
        ('Austin', 'Liddicoat', 7, NULL),
        ('Ian', 'Porter', 8, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;