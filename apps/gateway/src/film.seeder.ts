import { FilmSchema } from '../../film/src/film.schema';
import mongoose from 'mongoose';

const DB_CONNECTION_STRING = 'mongodb://localhost:27017/';

(async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    console.log('Database Connected');
  } catch (e) {
    console.log(e, 'Failed to connect to the database. Goodbye');
    process.exit(1);
  }
})();

const seedData = [
  {
    title: 'Punjaab nahi jao gi',
    director: 'abc',
    release_year: '2023-12-10',
    actors: ['Humayo Saeed', 'Mehwish hayaat'],
  },
  {
    title: 'Actor in law',
    director: 'abc',
    release_year: '2015-12-10',
    actors: ['Fahad Mustafa', 'Mehwish hayaat'],
  },
  {
    title: 'Wrong number',
    director: 'Yasir Nawaz',
    release_year: '2023-12-10',
    actors: ['Danish Taimoor', 'Mehwish hayaat'],
  },
];

let filmModel = mongoose.model('Film', FilmSchema);

async function seedDB() {
  await filmModel.insertMany(seedData);
}

seedDB().then(() => {
  console.log('film collection is seeded');
  mongoose.connection.close();
  console.log('Database diconnected');
});
