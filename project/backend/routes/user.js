const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    allUsers,
    getUserByAdmin,
    updateProfileBtAdmin,
    deleteUserByAdmin } = require('../controller/userController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/admin/allusers').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);

router.route('/user').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/user/update').put(isAuthenticatedUser, updateProfile)

router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUserByAdmin)
router.route('/admin/user/update/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProfileBtAdmin)
router.route('/admin/user/delete/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUserByAdmin)


router.route('/logout').get(logout);


module.exports = router;