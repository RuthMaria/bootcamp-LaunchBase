
/* 
Querys para criar o banco de dados e os relacionameos entre as tabelas.
Precisa instalar o Postgres e o Postbird.
*/

const db = `CREATE DATABASE foodfy`

const chefsTable = `
    CREATE TABLE chefs
    (
        id serial PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        avatar_url TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL
    )
`


const recipesTable = `
    CREATE TABLE recipes
    (
        id serial PRIMARY KEY NOT NULL,
        chef_id INTEGER NOT NULL,
        image TEXT NOT NULL,
        title TEXT NOT NULL,
        ingredients TEXT[] NOT NULL,
        preparation TEXT[] NOT NULL,
        information TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL,
        FOREIGN KEY (chef_id) REFERENCES chefs (id)
        
    )
`

const insertChefs = `

    INSERT INTO chefs (
        name,
        avatar_url,
        created_at
    ) VALUES (
        'Ruth Maria',
        'https://avatars2.githubusercontent.com/u/18095161?s=460&u=afaad6043224735425d5501f9815aafb9e930db4&v=4',
        '2020-09-08'
    )
`

const insertRecipes = `

    INSERT INTO recipes
    (
        chef_id,
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at
    ) VALUES (
        1,
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/launchbase/receitas/burger.png',
        'Triplo bacon burger',
        '{
            "3 kg de carne moída (escolha uma carne magra e macia)",
            "300 g de bacon moído",
            "1 ovo",
            "3 colheres (sopa) de farinha de trigo",
            "3 colheres (sopa) de tempero caseiro: feito com alho, sal, cebola, pimenta e cheiro verde processados no liquidificador",
            "30 ml de água gelada"
        }',
        '{
            "Misture todos os ingredientes muito bem e amasse para que fique tudo muito bem misturado.",
            "Faça porções de 90 g a 100 g.",
            "Forre um plástico molhado em uma bancada e modele os hambúrgueres utilizando um aro como base.",
            "Faça um de cada vez e retire o aro logo em seguida.",
            "Forre uma assadeira de metal com plástico, coloque os hambúrgueres e intercale camadas de carne e plásticos (sem apertar).",
            "Faça no máximo 4 camadas por forma e leve para congelar.",
            "Retire do congelador, frite ou asse e está pronto."
        }',
        'Preaqueça a chapa, frigideira ou grelha por 10 minutos antes de levar os hambúrgueres. Adicione um pouquinho de óleo ou manteiga e não amasse os hambúrgueres! <br><br> Você sabia que a receita que precede o hambúrguer surgiu no século XIII, na Europa? A ideia de moer a carne chegou em Hamburgo no século XVII, onde um açogueiro resolveu também temperá-la. Assim, a receita foi disseminada nos Estados Unidos por alemães da região. Lá surgiu a ideia de colocar o hambúrguer no meio do pão e adicionar outros ingredientes, como queijom tomates e alface.',
        '2020-09-08'
    )
` 

