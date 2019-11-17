const router = require('express').Router();
router.post('/register', (req, res) =>{

    res.status(200).json({message: "Registration endpoint!"});

});

router.post('/login', (req, res) =>{

    res.status(200).json({message: "Login endpoint!"});

});

module.exports = router;