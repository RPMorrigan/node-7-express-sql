// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

import express from 'express';
import pg from 'pg';
import config from './config.js';

const app = express();
const port = 3000;

const db = new pg.Pool({
    connectionString: config.databaseUrl,
    ssl: true
})

app.use(express.json());

app.listen(port, () => {
    console.log("Port's up, mate! Set sail starboard!");
})

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllAnimals()
    
    async function getAllAnimals () {

        let animals = await db.query(
            'SELECT * FROM animals ORDER BY id ASC'
        );

            console.log(animals.rows);
            
            return (animals.rows);
    };

// 2. getOneAnimalByName(name)

async function getOneAnimalByName(name) {

    const animal = await db.query(
        `SELECT * FROM animals WHERE name = $1`, [name]
    );

    console.log(animal.rows[0]);
    
    return animal.rows[0];
};

// 3. getOneAnimalById(id)

async function getOneAnimalById(id) {

    const animal = await db.query(
        `SELECT * FROM animals WHERE id = $1`, [id]
    );

    console.log(animal.rows[0]);

    return animal.rows[0];
};

// 4. getNewestAnimal()

async function getNewestAnimal() {

    const animal = await db.query(
        `SELECT * FROM animals ORDER BY id DESC LIMIT 1`
    );

    console.log(animal.rows[0]);

    return animal.rows[0];
    
};

// 5. 🌟 BONUS CHALLENGE — getAllMammals()

async function getAllMammals() {

    const animals = await db.query(
        `SELECT * FROM animals WHERE category = $1`, ['mammal']
    )

    console.log(animals.rows);

    return animals.rows;

};

// 6. 🌟 BONUS CHALLENGE — getAnimalsByCategory(category)

async function getAnimalsByCategory(category) {

    const animals = await db.query(
        `SELECT * FROM animals WHERE category = $1`, [category]
    );

    console.log(animals.rows);

    return animals.rows;

};

// 7. deleteOneAnimal(id)

async function deleteOneAnimal(id) {

    const animalData = await db.query(
        `SELECT name FROM animals WHERE id = $1`, [id]
    );

    if (animalData.rows.length === 0) {
        return `No animal found with id ${id}`;
    }

    const animalName = animalData.rows[0].name;

    await db.query(
        `DELETE FROM animals WHERE id = $1`, [id]
    );

    console.log(`Success! ${animalName} was deleted!`);

    return `Success! ${animalName} was deleted!`;

};

// 8. addOneAnimal(name, category, can_fly, lives_in)

async function addOneAnimal(name, category, can_fly, lives_in) {

    const addAnimal = await db.query(
        `INSERT INTO animals (name, category, can_fly, lives_in)
        VALUES ($1, $2, $3, $4)`, [name, category, can_fly, lives_in]
    );

    console.log(`Success! ${name} was added!`);
    
    return `Success! ${name} was added!`;

};

// 9. updateOneAnimalName(id, newName)

async function updateOneAnimalName(id, newName) {

    const updateAnimal = await db.query(
        `UPDATE animals SET name = $1 WHERE id = $2`, [newName, id]
    );

    console.log(`Success! The animal's name was updated!`)

    return `Success! The animal's name was updated!`;

};

// 10. updateOneAnimalCategory(id, newCategory)

async function updateOneAnimalCategory(id, newCategory) {

    const update = await db.query(
        `UPDATE animals SET category = $1 WHERE id = $2`, [newCategory, id]
    );

    console.log(`Success! The animal's category was updated!`)

    return `Success! The animal's category was updated!`;

};

// 11. 🌟 BONUS CHALLENGE — addManyAnimals(animals)

async function addManyAnimals(animals) {

    for (let animal of animals) {
        await db.query(
        `INSERT INTO animals (name, category, can_fly, lives_in)
        VALUES ($1, $2, $3, $4)`,
        [animal.name, animal.category, animal.can_fly, animal.lives_in]
    );
}
    console.log(`Success! The animals were added!`);

    return `Success! The animals were added!`;

}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-animals

app.get('/get-all-animals', async (req, res) => {
    
    const result = await getAllAnimals();

    res.send(result);

});

// 2. GET /get-one-animal-by-name/:name

app.get('/get-one-animal-by-name/:name', async (req, res) => {

    let name = req.params.name;

    const result = await getOneAnimalByName(name);

    res.send(result);

});

// 3. GET /get-one-animal-by-id/:id

app.get('/get-one-animal-by-id/:id', async (req, res) => {

    let id = req.params.id;

    const result = await getOneAnimalById(id);

    res.send(result);

});

// 4. GET /get-newest-animal

app.get('/get-newest-animal', async (req, res) => {

    const result = await getNewestAnimal();

    res.send(result);

});

// 5. GET /get-all-mammals

app.get('/get-all-mammals', async (req, res) => {

    const result = await getAllMammals();

    res.send(result);

});

// 6. GET /get-animals-by-category/:category

app.get('/get-animals-by-category/:category', async (req, res) => {

    let category = req.params.category;

    const result = await getAnimalsByCategory(category);

    res.send(result);

});

// 7. POST /delete-one-animal/:id

app.get('/delete-one-animal/:id', async (req, res) => {

    let id = req.params.id;

    const result = await deleteOneAnimal(id);

    res.send(result);

});

// 8. POST /add-one-animal

app.post('/add-one-animal', async (req, res) => {

    const { name, category, can_fly, lives_in } = req.body;

    const result = await addOneAnimal(name, category, can_fly, lives_in);

    res.send(result);

});

// 9. POST /update-one-animal-name

app.post('/update-one-animal-name', async (req, res) => {

    const { id, newName } = req.body;

    const result = await updateOneAnimalName(id, newName);

    res.send(result);

})

// 10. POST /update-one-animal-category

app.post('/update-one-animal-category', async (req, res) => {

    const { id, newCategory } = req.body;

    const result = await updateOneAnimalCategory(id, newCategory);

    res.send(result);

})

// 11. 🌟 POST /add-many-animals

app.post('/add-many-animals', async (req, res) => {

    console.log(req.body);

    const animals = req.body.animals;

    const result = await addManyAnimals(animals);

    res.send(result);

});