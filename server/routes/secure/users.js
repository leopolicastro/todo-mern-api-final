const router = require('express').Router(),
  {
    getCurrentUser,
    updateCurrentUser,
    logoutUser,
    logoutAllDevices,
    deleteUser,
    uploadAvatar,
    updatePassword
  } = require('../../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', updateCurrentUser);

router.post('/logout', logoutUser);

router.post('/logoutAll', logoutAllDevices);

router.delete('/me', deleteUser);

router.post('/avatar', uploadAvatar);

router.put('/password', updatePassword);

module.exports = router;
