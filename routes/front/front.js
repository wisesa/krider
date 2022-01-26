const express = require('express');
const router = express.Router();

// @desc    Process add form
// @route   POST /stories
router.get('/', async(req, res) => {
    try {
        //console.log(menu);

        res.render('layouts/front', {
            layout: false
        });
    } catch (err) {
        console.error(err)
            //res.render('error/500')
    }
})

module.exports = router;