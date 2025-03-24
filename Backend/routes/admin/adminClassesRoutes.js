const router = require('express').Router();
const {classCreation, getAllClasses, updateClasses, deleteClass} = require('../../controllers/admin/classController');
const adminAuthMiddleware = require('../../middleware/adminAuthMiddleware');


router.post('/', adminAuthMiddleware('admin'), classCreation);
router.get('/', adminAuthMiddleware('admin'), getAllClasses);
router.put('/:id', adminAuthMiddleware('admin'), updateClasses);
router.delete('/:id', adminAuthMiddleware('admin'), deleteClass);



module.exports = router;