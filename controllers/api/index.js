const router = require('express').Router();
const userRoutes = require('./userRoutes');
const userProf = require('./userProf')

router.use('/users', userRoutes);
router.use('/profile', userProf)

module.exports = router;