const express = require('express');
const router = express.Router();
const Collection = require('../../models/Collection');
var bodyParser = require('body-parser');
var fs = require('fs');

// @route    POST api/menu
// @desc     Add menu
// @access   Private
router.post('/', (req, res) => {
    console.log(req.body);
    
    const newCollection = new Collection({
        name: req.body.name,
        year: req.body.year,
        pic: req.body.pic
    });
    
    const collection = newCollection.save();

    res.json(collection);

});

// @route    UPDATE api/collection
// @desc     Update collection
// @access   Private
router.put('/:id', 
    async(req, res) => {

        const {
            name,
            year,
            pic
        } = req.body;

        //Build menu object
        const collectionFields = {};
        if (name) collectionFields.name = name;
        if (year) collectionFields.year = year;
        if (pic) collectionFields.type = pic;
        //if (file) collectionFields.pic = `${file.name}`;
        console.log(collectionFields);
            
        let collection = await Collection.findOneAndUpdate({ _id: req.params.id }, { $set: collectionFields }, { new: true });
        res.json(collection);
    }
);

// @route    GET api/load/id
// @desc     Load menu specific menu with id parameter
// @access   Private
router.get('/load/:id', async(req, res) => {
    try {
        const collection = await Collection.findOne({_id:req.params.id});
         //const profile = await Profile.findOne({ user: req.params.id }).populate('user', ['name', 'avatar']);

        res.json(collection);
    } catch (err) {
        console.error(err)
            //res.render('error/500')
    }
})

// @route    GET api/menu/list
// @desc     Load all menu order by type asc and name asc
// @access   Public
router.get('/list', async(req, res) => {
    try {
        const collection = await Collection.find().sort({ type: 1, name: 1 });
        //console.log(menu);

        res.json(collection);
    } catch (err) {
        console.error(err)
        //res.render('error/500')
    }
})

// @route    DELETE api/menu/:id
// @desc     Delete Menu
// @access   Private
router.delete('/:id', async(req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);

        if (!collection) {
            return res.status(404).json({ msg: 'Collection not found' });
        }

        await collection.remove();

        res.json({ msg: 'Collection removed' });
    } catch (err) {
        console.error(err.message);

        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Collection not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;