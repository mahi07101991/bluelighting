const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const gravatar = require('gravatar')
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/loan-api', {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

// CORS support
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

const Loans = require('./models/Loan');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get all loans Route
// TODO: Request to get all loans

// Create a loan
// TODO: Request to create a loan

// Get a loan by id
// TODO: Request to get a loan by id

// Delete a loan
// TODO: Request to delete a loan by id

// Update a loan
// TODO: Request to update a loan

const Users = require('./models/User');

// GET api/users/register
// router.post('/register', (rsq, res) => {
//   Users.findOne({ email: req.body.email })
//     .then(user => {
//       if (user) {
//         return res.status(400).json({ email: 'Email already exists' });
//       } else {
//         const avatar = gravatar.url(req.body.email, {
//           s: '200',
//           r: 'pg',
//           d: 'mm'
//         })
//         const newUser = new Users({
//           name: req.body.name,
//           email: req.body.email,
//           avatar: avatar,
//           password: req.body.password
//         })
//       }
//     })
// })

// Listen on port
app.listen(PORT, function () {
  console.log('[SERVER]: Running on port ' + PORT);
});