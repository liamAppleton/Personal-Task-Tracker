const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.send(user);
  } catch (error) {
    return res.status(404).send('ID not valid');
  }
});

router.post('/', async (req, res) => {
  console.log('Reqbody: ', req.body);
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    user = await user.save();

    res.send(user);
  } catch (error) {
    res.status(500).send('Please enter all required fields.');
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedFields = {};
    const allowedFields = ['username', 'password'];

    for (let field of allowedFields) {
      if (req.body[field] !== undefined) {
        updatedFields[field] = req.body[field];
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedFields,
      },
      { new: true }
    );

    res.send(user);
  } catch (error) {
    return res.status(404).send('ID not valid');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.send(user);
  } catch (error) {
    return res.status(404).send('ID not valid');
  }
});

module.exports = router;
