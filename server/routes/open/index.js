const router = require('express').Router(),
  {
    createUser,
    loginUser,
    requestPasswordReset,
    passwordRedirect,
    googleLogin,
    googleRedirect,
    facebookLogin,
    facebookRedirect
  } = require('../../controllers/users');

router.post('/', createUser);

router.post('/login', loginUser);

router.get('/password', requestPasswordReset);

router.get('/password/:token', passwordRedirect);

router.get('/google', googleLogin);

router.get('/google/redirect', googleRedirect);

router.get('/facebook', facebookLogin);

router.get('/facebook/redirect', facebookRedirect);

module.exports = router;
