const router = require('express').Router();

router.get('/', (req, res) =>{

    res.status(200).json({message: "Welcome to the auth endpoints."});
    
});

router.post('/register', (req, res) =>{

    res.status(200).json({message: "Registration endpoint!"});

});

router.post('/login', (req, res) =>{

    res.status(200).json({message: "Login endpoint!"});

});

module.exports = router;