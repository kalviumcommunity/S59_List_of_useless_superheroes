const express = require('express');
const router = express.Router();
const {connectToDB, isConnected} = require('../controllers/db')
const marvel =  require('../models/marvel')
const comic = require('../models/comic')
const dc = require('./../models/dc')
const post = require('./../models/posts')
const { validatePost } = require('../controllers/joi_schemas')
require('dotenv').config();

const jwt = require('jsonwebtoken');
connectToDB()


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  
  if(token == null){
    return res.status(401).json({ error: "Unauthorized Access", message: "You are not authorized to access this resource." });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, userId) => {
    if(err){
      return res.status(403).json({ error: "Forbidden", message: "Access forbidden. Please login again." });
    }
    req.userId = userId;
    next();
  });
}


// get for comic

router.get('/comics', async(req, res) => {
    const data = await comic.find()
    res.send(data)
});

// get for marvel

router.get('/marvel', async(req, res) => {
    const data = await marvel.find()
    res.send(data)
});

// get for dc
router.get('/dc', async(req, res) => {
    const data = await dc.find()
    res.send(data)
}); 

// get for posts
router.get('/posts', async(req, res) => {
    const data = await post.find()
    res.send(data)
}); 


// post for marvel
router.post('/marvel', authenticateToken, async (req, res) => {
  try {
    const newMarvel = new marvel(req.body);
    const savedMarvel = await newMarvel.save();
    res.status(201).send(savedMarvel);
  } catch (error) {
    res.status(500).send(error);
  }
});
// POST for comic
router.post('/comic', authenticateToken, async (req, res) => {
  try {
    const newComic = new comic(req.body);
    const savedComic = await newComic.save();
    res.status(201).send(savedComic);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST for dc
router.post('/dc', authenticateToken, async (req, res) => {
  try {
    const newDC = new dc(req.body);
    const savedDC = await newDC.save();
    res.status(201).send(savedDC);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete for marvel
router.delete('/marvel/:id', authenticateToken, async (req, res) => {
  try {
    const deletedMarvel = await marvel.findByIdAndDelete(req.params.id);
    if (!deletedMarvel) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete for comic
router.delete('/comic/:id', authenticateToken, async (req, res) => {
  try {
    const deletedComic = await comic.findByIdAndDelete(req.params.id);
    if (!deletedComic) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully' });
  }
  catch (error) {
    res.status(500).send(error);
  }
});

// Delete for dc
router.delete('/dc/:id', authenticateToken, async (req, res) => {
  try {
    const deletedDC = await dc.findByIdAndDelete(req.params.id);
    if (!deletedDC) {
      return res.status(404).json({ error: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
}
);

router.post('/posts', authenticateToken,  async (req, res) => {
    try {
        // validate the request body -{POST}
        const { error } = validatePost(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const newPost = new post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add data', "req.body" : req.body });
    }
});

router.delete('/posts/:id', authenticateToken,async (req, res) => {
    try {
        const deletedPost = await post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// comments
router.post('/posts/:id/comments', authenticateToken,async (req, res) => {
    try {
      const postId = req.params.id;
      const { text } = req.body;
  
      const existingPost = await post.findById(postId);
  
      if (!existingPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      existingPost.comments.push({ text, createdAt: Date.now() });
  
      const updatedPost = await existingPost.save();
  
      res.status(201).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//   Comments Delete => 
router.delete('/posts/:postId/comments/:commentId', authenticateToken,async (req, res) => {
    try {
      const postId = req.params.postId;
      const commentId = req.params.commentId;
  
      const existingPost = await post.findById(postId);
  
      if (!existingPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      const commentIndex = existingPost.comments.findIndex(comment => comment._id.toString() === commentId);
  
      if (commentIndex === -1) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      existingPost.comments.splice(commentIndex, 1);
  
      const updatedPost = await existingPost.save();
  
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.put('/posts/:id', authenticateToken,async (req, res) => {
    try {
        const updatedPost = await post.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
        });

        if (!updatedPost) {
            return res.status(404).json({ error: 'Data not found' });
        } 
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;