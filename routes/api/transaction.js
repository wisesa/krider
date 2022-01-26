const express = require('express');
const router = express.Router();
const Transaction = require('../../models/Transaction');
var bodyParser = require('body-parser');

// @route   GET api/transaction
// @desc    Get all transaction list
// @route   Public
router.get('/', async(req, res) => {
    try {
        const transaction = await Transaction.find({ 'lat' : { $exists: false } }).lean().sort({ date: -1 });
        res.send(transaction);

    } catch (err) {
        console.error(err)
            //res.render('error/500')
    }
})

// @route   GET api/transaction
// @desc    Get all transaction list
// @route   Public
router.get('/mobile', async(req, res) => {
    try {
        const transaction = await Transaction.find({ 'lat' : { $exists: true, $ne: null } }).lean().sort({ date: -1 });
        res.send(transaction);

    } catch (err) {
        console.error(err)
            //res.render('error/500')
    }
})

// @route    POST api/transaction
// @desc     Create or update transaction
// @access   Private
router.post('/',
    async(req, res) => {
        var user_id = "609cbd0d56dc46efacca7fcb";
        var food = {};
        var total = req.body.total;
        var count = req.body.chk.length;

        if(total>0){
            transaction = new Transaction({
                user_id,
                food,
                total
            });
    
            await transaction.save();
            var transaction_id = transaction.id;
    
            for (var i = 0; i < count; i++) {
                var str = req.body.chk[i]
                var string = str.split("|");
    
                const menu_id = string[0];
                const name = string[1];
                const price = string[2];
                const amount = string[3];
    
                //console.log(transaction_id);
    
                const transactionFields = {};
                transactionFields.menu_id = menu_id;
                transactionFields.name = name;
                transactionFields.price = price;
                transactionFields.amount = amount;
    
                if(amount>0){
                    try {
                        const transaction = await Transaction.findOne({ _id: transaction_id });
                        transaction.menu.unshift(transactionFields);
                        await transaction.save();
                        //console.log(transaction);
                    } catch (err) {
                        console.error(err.message);
                        res.status(500).send('Server Error');
                    }
        
                }
            }
            return res.json(transaction_id);
        }

        //const print = await Transaction.find({ _id: transaction_id }).lean().sort({ menu: 1 });

    }, (req, res) => {

});

// @route    POST api/transaction/mopbile
// @desc     Create or update transaction on mobile application, the difference is on mobile we can insert coordinate of our target to send the food order.
// @access   Private
router.post('/mobile',
    async(req, res) => {
        var user_id = "609cbd0d56dc46efacca7fcb";
        var food = {};
        var total = req.body.total;
        var lat = req.body.lat;
        var long = req.body.long;

        var count = req.body.chk.length;
        //res.send(count.toString());

        transaction = new Transaction({
            user_id,
            food,
            total,
            lat,
            long
        });

        await transaction.save();
        var transaction_id = transaction.id;

        for (var i = 0; i < count; i++) {
            var str = req.body.chk[i]
            var string = str.split("|");

            const menu_id = string[0];
            const name = string[1];
            const price = string[2];
            const amount = string[3];

            console.log(transaction_id);

            const transactionFields = {};
            transactionFields.menu_id = menu_id;
            transactionFields.name = name;
            transactionFields.price = price;
            transactionFields.amount = amount;

            try {
                const transaction = await Transaction.findOne({ _id: transaction_id });
                transaction.menu.unshift(transactionFields);
                await transaction.save();
                console.log(transaction);
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }

            // if (menu) {
            //     //Update
            //     menu = await Transaction.findOneAndUpdate({ user_id: user_id }, { $set: transactionFields }, { new: true });
            // }

            return res.json(transaction._id);
        }

    }, (req, res) => {

});

// @route    Get transaction/id
// @desc     Get items from single transaction
// @access   Public
router.get('/:id', async(req, res) => {
    try {
        const transaction = await Transaction.findOne({_id:req.params.id});
         //const profile = await Profile.findOne({ user: req.params.id }).populate('user', ['name', 'avatar']);

        res.json(transaction);
    } catch (err) {
        console.error(err)
            //res.render('error/500')
    }
})

// @route    Get transaction/id
// @desc     Get items from single transaction
// @access   Public
router.get('/print/:id', async(req, res) => {
    try {
        const print = await Transaction.findOne({_id:req.params.id});
        //const print = await Transaction.find({ _id: transaction_id }).lean().sort({ menu: 1 });

        res.render('menu/print', {
            print,
        })
    } catch (err) {
        console.error(err)
            //res.render('error/500')
    }
})

// @route    PUT transaction/id
// @desc     Update transaction, this function is used on mobile apps
// @access   Private
router.put('/:id', 
    async(req, res) => {

        const {
            lat,
            long
        } = req.body;

        //Build menu object
        const Fields = {};
        if (lat) Fields.lat = lat;
        if (long) Fields.long = long;
        console.log(Fields);
            
        let menu = await Menu.findOneAndUpdate({ _id: req.params.id }, { $set: Fields }, { new: true });
    }
);

module.exports = router;