const express = require('express');
const router = express.Router();
const {connectToDB, isConnected} = require('../controllers/db')
// const comic =  require('./../models/characterCard')
const card =  require('./../models/test')
connectToDB()

router.get('/', async(req, res) => {
    const data = await card.find()
    res.send(data)
});

router.get('/:id', async(req, res) => {
    const data = await card.findById(req.params.id)
    res.send(data)
});

router.post('/', async (req, res) => {
    try {
      const newCard = new card(req.body);
      const savedCard = await newCard.save();
  
      res.status(201).json(savedCard);
    } catch (error) {
      res.status(400).json({ error: 'Failed to add data', "req.body" : req.body });
    }
  });


  router.put('/p/:id', async (req, res) => {
    try {
        const updatedCard = await card.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
        });

        if (!updatedCard) {
            return res.status(404).json({ error: 'Data not found' });
        }

        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedCard = await card.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedCard) {
            return res.status(404).json({ error: 'Data not found' });
        }

        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCard = await card.findByIdAndDelete(req.params.id);
        if (!deletedCard) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;