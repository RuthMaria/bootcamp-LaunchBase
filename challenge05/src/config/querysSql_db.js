
/* 
Querys para criar o banco de dados e os relacionameos entre as tabelas.
Precisa instalar o Postgres e o Postbird.
*/

const db = `CREATE DATABASE my_teacher`

const teachersTable = `
    CREATE TABLE teachers
    (
        id serial PRIMARY KEY NOT NULL,
        avatar_url TEXT NOT NULL,
        fullname TEXT NOT NULL,
        birth TIMESTAMP NOT NULL,
        education_level TEXT NOT NULL,
        classes TEXT NOT NULL,
        occupation_area TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL
    )
`

const studentsTable = `
    CREATE TABLE students
    (
        id serial PRIMARY KEY NOT NULL,
        avatar_url TEXT NOT NULL,
        fullname TEXT NOT NULL,
        email TEXT NOT NULL,
        birth TIMESTAMP NOT NULL,
        school_year TEXT NOT NULL,
        weekly_workload INTEGER NOT NULL,
        teacher_id INTEGER NOT NULL,
        FOREIGN KEY (teacher_id) REFERENCES teachers (id)
    )
`

const insertTeacher = `

    INSERT INTO teachers (
        avatar_url, 
        fullname, 
        birth, 
        education_level, 
        classes, 
        occupation_area, 
        created_at
    ) VALUES (
        'https://avatars1.githubusercontent.com/u/10697959?s=460&u=3f493c6c586f256d6edbb694257ae97371588e4f&v=4',
        'Mayara Rysia dos Santos',
        '1995-06-09',
        'medium',
        'Presencial',
        'Informática, Matemática',
        '2020-09-02'
    )
`

const insertStudents = `

    INSERT INTO students 
    (
        avatar_url, 
        fullname, 
        email, 
        birth, 
        school_year, 
        weekly_workload,
        teacher_id
    ) VALUES (
        'https://avatars2.githubusercontent.com/u/18095161?s=460&u=afaad6043224735425d5501f9815aafb9e930db4&v=4',
        'Ruth Maria',
        'ruthmariia01@gmail.com',
        '1991-05-01',
        '3 high school',
        4,
        1
    )
` 

