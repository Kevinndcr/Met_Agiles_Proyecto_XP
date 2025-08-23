const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const generateId = require('../utils/idGenerator');

exports.register = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      id_usuario: generateId(),
      email,
      passwordHash: hashedPassword,
      ...rest
    });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).send({
      message: 'User registered successfully',
      user: newUser,
      token
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email or password is wrong');

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(400).send('Email or password is wrong');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({
      message: 'Logged in successfully',
      user,
      token
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
