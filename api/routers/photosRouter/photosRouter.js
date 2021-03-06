const router = require('express').Router();
const authorized = require('../../middleware/authorized');
const axios = require('axios');
const Photos = require('./photosModel');
const Analysis = require('./analysisModel');

// Get all photos submitted by logged in user.
router.get('/:id', authorized, async (req, res) => {
    const { id } = req.params;

    try {

        // const photos = await Photos.findAllByUser(id);

        // if (photos) {

        //     res.status(200).json(photos);
        // }

        const photos = await Photos.findPhotoAndAnalysisByUserId(id);

        if(photos)
        {
            res.status(200).json(photos);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


// Submit a photo title, url to the database.
router.post('/:id', authorized, async (req, res) => {
    const { id } = req.params;
    const { photo_title, photo_url } = req.body;

    if (photo_title && photo_url) {

        const user = await Photos.findUser(id);

        if (user) {

            const photo = await Photos.add({title: photo_title, url: photo_url, user_id: id});

            if (photo) {

                try {
                    const stats = await axios.post('https://pic-metric-1.herokuapp.com/predictor', { photo_id: photo.id, url: photo.url });

                    let data = stats.data;

                    if (data) {
                        let keys = Object.keys(data.predictions);
                        let values = Object.values(data.predictions);

                        const analysis = {
                            class1: keys[0],
                            conf1: values[0],
                            class2: keys[1],
                            conf2: values[1],
                            class3: keys[2],
                            conf3: values[2],
                            photo_id: photo.id
                        }

                        const result = Analysis.add(analysis);

                        res.status(200).json({
                                id: photo.id,
                                title: photo.title,
                                url: photo.url,
                                class1: analysis.class1,
                                conf1: analysis.conf1,
                                class2: analysis.class2,
                                conf2: analysis.conf2,
                                class3: analysis.class3,
                                conf3: analysis.conf3
                        });
                    }

                } catch (error) {
                    console.log(error);
                }

            }

        }

    }
});


// Update title of a stored photo by user.
router.put('/:id', authorized, async (req,res) =>{
    const {id} = req.params;
    const {photo_id, photo_title} = req.body;

    if(!photo_id && !title){
        res.status(404).json({message: "Missing required fields photo_id, and title."});
    }

    try{
        const photo = await Photos.findById(photo_id);
        if(photo){
            if(photo.user_id == id){
                const result = await Photos.update(photo_id, {title:photo_title, url:photo.url, user_id:id});
                if(result > 0){
                    const p = await Photos.findById(photo.id);
                    if(p){
                        res.status(200).json(p);
                    }
                }
            }else{
                res.status(401).json({message: "You cannot edit a photo you did not share."});
            }
        }
    }catch(error){
        res.status(500).json(error);
    }

});

// Delete a stored photo by ID.
router.delete('/:id', authorized, async (req,res) =>{
    const {id} = req.params;

    try{
        const photo = await Photos.findById(id);
        if(photo){
            const result = await Photos.remove(id);

            if(result > 0){
                res.status(200).json({message: `Photo with id: ${id} has been removed.`});
            }
        }
    }catch(error){
        res.status(500).json(error);
    }
})


module.exports = router;