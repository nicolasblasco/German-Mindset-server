const Postulants = require('../models/Postulants');

const listPostulants = (req, res) => {
  Postulants.find(req.query)
    .populate('profiles.profileId', 'name')
    .then((postulants) => {
      res.status(200).json({
        message: 'List of Postulants',
        data: postulants,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: error,
      });
    });
};

const createPostulant = (req, res) => {
  const bodyReq = req.body;
  const postulant = new Postulants({
    firstName: bodyReq.firstName,
    lastName: bodyReq.lastName,
    email: bodyReq.email,
    password: bodyReq.password,
    address: bodyReq.address,
    birthday: bodyReq.birthday,
    available: bodyReq.available,
    phone: bodyReq.phone,
    profiles: bodyReq.profiles,
    studies: bodyReq.studies,
    workExperience: bodyReq.workExperience,
  });

  postulant.save((error) => {
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    return res.status(201).json({
      message: 'Postulant created',
      data: postulant,
    });
  });
};

const deletePostulant = (req, res, next) => {
  Postulants.findByIdAndDelete(req.params.id, (error, pointedPostulant) => {
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    if (!pointedPostulant) {
      return res.status(404).json({
        message: 'Postulant Id does not exist',
      });
    }
    res.locals.uid = pointedPostulant.firebaseUid;
    return next();
  });
};

const updatePostulants = (req, res, next) => {
  const bodyReq = req.body;
  Postulants.findByIdAndUpdate(
    req.params.id,
    {
      firstName: bodyReq.firstName,
      lastName: bodyReq.lastName,
      email: bodyReq.email,
      password: bodyReq.password,
      address: bodyReq.address,
      birthday: bodyReq.birthday,
      available: bodyReq.available,
      phone: bodyReq.phone,
      profiles: bodyReq.profiles,
      studies: bodyReq.studies,
      workExperience: bodyReq.workExperience,
    },
    { new: true },
    (error, newPostulant) => {
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      if (!newPostulant) {
        return res.status(404).json({
          message: 'Postulant Id does not exist',
        });
      }
      res.locals.userType = 'Postulant';
      res.locals.updatedUser = newPostulant;
      return next();
    },
  );
};

module.exports = {
  listPostulants,
  createPostulant,
  deletePostulant,
  updatePostulants,
};
