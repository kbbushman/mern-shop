import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB().then(() => {
  if (process.argv[2] === '-d') {
    destroyData();
  } else {
    importData();
  }
});

const importData = async () => {
  try {
    console.log('Destroying records...'.yellow);
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Records destroyed successfully'.green.inverse);

    console.log('Creating records...'.yellow);
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return {...product, user: adminUser};
    });

    await Product.insertMany(sampleProducts);

    console.log('Records created successfully'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};


const destroyData = async () => {
  try {
    console.log('Destroying records...'.yellow);
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Records destroyed successfully'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
