const connection = require('../config/connection');
const { User } = require('../models');
const { getRandomName } = require('./data');

connection.on('error', (err) => err); // set up connection

connection.once('open', async () => { // start seed
  console.log('connected'); // confirm connected

  await User.deleteMany({}); // clears existing data

  const users = []; // initialize empty array

  for (let i = 0; i < 20; i++) { // create 20 entries

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const username = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;
    const email = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}` + '@gmail.com';

    users.push({
      username,
      email,
    });
  }

  await User.collection.insertMany(users); // insesrt users array as collection

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
