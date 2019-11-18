const router = require('express').Router();
const authorized = require('../../middleware/authorized');

router.get('/:id', authorized, (req,res) =>{
    const {id} = req.params;
    res.status(200).json({message: `Here are all the photos by the user with the id: ${id}`});
});

router.put('/:id', authorized, (req,res) =>{
    const {id} = req.params;

    res.status(200).json({message: `Updated phot with id: ${id}`});
});


module.exports = router;