const router = require('express').Router();
const adminClassesController = require('../../controllers/admin/adminClassesController');
const adminAuthMiddleware = require('../../middleware/adminAuthMiddleware');


router.post('/', adminAuthMiddleware('admin'), adminClassesController.createClass);



module.exports = router;