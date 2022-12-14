INSERT INTO department (department_name)
VALUES ("Human Resources"),
       ("IT"),
       ("Specimen Processing"),
       ("Lab");

INSERT INTO role (title, salary, department_id)
VALUES ("Programmer I", "60000", "2"),
       ("Programmer II", "80000", "2"),
       ("Talent Aquisition", "70000", "1"),
       ("Processing Tech", "40000", "3"),
       ("Lab Tech", "80000", "4"),
       ("Supervisor", "90000", "1");       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Vance", 6, NULL),
       ("Pete", "Woodbury", 3, 1),
       ("Mary", "Strand", 2, 1),
       ("Jamie", "Johnson", 4, 1),
       ("Agatha", "Reese", 4, 1),
       ("Eli", "Freeman", 5, 1),
       ("Landon", "Donovan", 5, 1),
       ("Angela", "Melendez", 1, 1),
       ("Walter", "White", 2, 1),
       ("Grant", "Elsberry", 4, 1);
       