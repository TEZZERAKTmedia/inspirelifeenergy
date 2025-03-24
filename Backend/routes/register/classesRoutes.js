const express = require('express');
const {getAllClasses} = require('../../controllers/register/classesController.js')


const router = express.Router();

router.get('/', getAllClasses);

module.exports = router;
