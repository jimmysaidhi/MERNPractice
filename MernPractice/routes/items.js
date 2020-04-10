// Adding the Express router
const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../models/item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        // -1 for descending
        .sort({ date: -1 })
        .then(items => res.json(items));
});

router.post('/', (req, res) => {
   const newItem = new Item({
    name: req.body.name
   });

   newItem.save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove()
        .then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
    });



module.exports = router;
