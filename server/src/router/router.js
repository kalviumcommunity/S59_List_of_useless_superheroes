const express = require('express');
const router = express.Router();
const {connectToDB, isConnected} = require('../controllers/db')
// const comic =  require('./../models/characterCard')
const marvel =  require('../models/marvel')
const comic = require('../models/comic')
const dc = require('./../models/dc')
const post = require('./../models/posts')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validatePost } = require('../controllers/joi_schemas')
const User = require('../models/userModel');
require('dotenv').config();
connectToDB()


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

router.post('/posts', async (req, res) => {
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

router.delete('/posts/:id', async (req, res) => {
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
router.post('/posts/:id/comments', async (req, res) => {
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
router.delete('/posts/:postId/comments/:commentId', async (req, res) => {
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


router.put('/posts/:id', async (req, res) => {
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


// User List

router.get('/users', async(req, res) => {
    const data = await User.find()
    res.send(data)
}
);


// USER SIGNUP

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with the provided email or username already exists' });
    }

    const newUser = new User({ username, email });

    newUser.setPassword(password);

    await newUser.save();

    res.status(201).json({ message: 'User successfully created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// User Authentication 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({token, userName : user.username, userId : user._id});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// marvel patch request 

// router.patch('/marvel/:id', async (req, res) => {
//     try {
//         const updatedCard = await marvel.findByIdAndUpdate(
//             req.params.id,
//             { $set: req.body },
//             { new: true }
//         );

//         if (!updatedCard) {
//             return res.status(404).json({ error: 'Data not found' });
//         }

//         res.status(200).json(updatedCard);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // comics patch request 

// router.patch('/comics/:id', async (req, res) => {
//     try {
//         const updatedCard = await comic.findByIdAndUpdate(
//             req.params.id,
//             { $set: req.body },
//             { new: true }
//         );

//         if (!updatedCard) {
//             return res.status(404).json({ error: 'Data not found' });
//         }

//         res.status(200).json(updatedCard);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // dc patch request 
// router.patch('/dc/:id', async (req, res) => {
//     try {
//         const updatedCard = await dc.findByIdAndUpdate(
//             req.params.id,
//             { $set: req.body },
//             { new: true }
//         );

//         if (!updatedCard) {
//             return res.status(404).json({ error: 'Data not found' });
//         }

//         res.status(200).json(updatedCard);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedCard = await card.findByIdAndDelete(req.params.id);
//         if (!deletedCard) {
//             return res.status(404).json({ error: 'Data not found' });
//         }
//         res.status(200).json({ message: 'Data deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


module.exports = router;