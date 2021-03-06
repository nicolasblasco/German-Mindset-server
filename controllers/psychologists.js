const Psychologists = require('../models/Psychologists');

const listPsychologists = (req, res) => {
  Psychologists.find(req.query)
    .then((psychologists) => {
      res.status(200).json({
        message: 'List of Psychologists',
        data: psychologists,
      });
    })
    .catch((err) => res.status(400).json({ message: err }));
};

const createPsychologist = (req, res) => {
  const psychologist = new Psychologists({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });
  psychologist.save((err, newPsychologist) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    return res.status(201).json({
      message: 'Psychologist Created',
      data: newPsychologist,
    });
  });
};

const updatePsychologist = (req, res, next) => {
  Psychologists.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    },
    { new: true },
    (err, updatedPsychologist) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      if (!updatedPsychologist) {
        return res.status(404).json({ message: `The psychologist 'id' (${req.params.id}) given  does not exist.` });
      }
      res.locals.userType = 'Psychologist';
      res.locals.updatedUser = updatedPsychologist;
      return next();
    },
  );
};

const deletePsychologist = (req, res, next) => {
  Psychologists.findByIdAndDelete(req.params.id, (err, deletedPsychologist) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    if (!deletedPsychologist) {
      return res.status(404).json({ message: `The psychologist 'id' (${req.params.id}) given  does not exist.` });
    }
    res.locals.uid = deletedPsychologist.firebaseUid;
    return next();
  });
};

module.exports = {
  listPsychologists,
  createPsychologist,
  deletePsychologist,
  updatePsychologist,
};
