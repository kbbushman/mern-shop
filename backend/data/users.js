import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@proshop.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'jdoe@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Kevin Smith',
    email: 'ksmith@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
