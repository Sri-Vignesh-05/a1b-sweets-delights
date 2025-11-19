const express9 = require('express');
const profileCtrl = require('../controllers/profilesController');
const routerProfile = express9.Router();


routerProfile.get('/', profileCtrl.getProfile);
routerProfile.post('/', profileCtrl.createOrUpdateProfile);


module.exports = routerProfile;