const User = require('../models/userModel');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('User not found');

    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    if (!updatedUser) return res.status(404).send('User not found');

    res.send(updatedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
