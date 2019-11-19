const router = require('express').Router();
const authorized = require('../../middleware/authorized');
const axios = require('axios');

router.get('/:id', authorized, (req,res) =>{
    const {id} = req.params;
    res.status(200).json({message: `Here are all the photos by the user with the id: ${id}`});
});

router.put('/:id', authorized, (req,res) =>{
    const {id} = req.params;

    res.status(200).json({message: `Updated phot with id: ${id}`});
});

router.post('/:id', authorized, (req,res) =>{
    const {id} = req.params;
    const {photo_id, title, url} = req.body;

    if(title && body){
        axios.post('https://pic-metric1.herokuapp.com/predictor', {photo_id, url})
        .then(result =>{
            res.status(200).json(result);
        }).catch(error =>{
            res.status(500).json({error: `Error: ${error}`});
        });
        res.status(201).json({message: `Received a request from user with id: ${id} to add ${title} from url: ${url}`});
    }else{
        res.status(401).json({message: 'Please provide a title & url in your request.'});
    }
});


module.exports = router;