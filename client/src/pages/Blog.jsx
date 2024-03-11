import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Modal from 'react-modal';
import ModalBlog from '../components/ModalBlog';
import ModalComment from '../components/ModalComment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

// https://serverk.onrender.com/api
// http://localhost:5000/api/

function Blog() {
  const API_URI = 'http://localhost:5000/api/posts';
  const [posts, setPosts] = useState([]);
  const [visibleBodies, setVisibleBodies] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);
  const [change, setChange] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [postIdComment, setPostIdComment] = useState('');

  const fetchData = async () => {
    // toast.info("Fetching Data.....")
    try {
      const response = await fetch(API_URI);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const initialVisibleBodies = {};
      data.forEach((post) => {
        initialVisibleBodies[post._id] = false;
      });
      setVisibleBodies(initialVisibleBodies);
      setPosts(data);
      // toast.success('Data fetched successfully!');
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data. Please try again later.');
    }
  };

  const refresh = () => {
    setChange(!change);
  }

  useEffect(() => {
    fetchData();
  }, [change]);

  const toggleBody = (postId) => {
    setVisibleBodies((prevVisibleBodies) => {
      const updatedVisibleBodies = { ...prevVisibleBodies };
      Object.keys(updatedVisibleBodies).forEach((key) => {
        updatedVisibleBodies[key] = false;
      });
      updatedVisibleBodies[postId] = !prevVisibleBodies[postId];
      return updatedVisibleBodies;
    });
  };

  const addPost = async (newPost) => {
  try {
    await toast.promise(
      fetch(API_URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      }),
      {
        loading: 'Adding Post...',
        success: 'Post added successfully!',
        error: 'Failed to add a new post. Please try again later.',
      }
    );

    setIsModalOpen(false);
    refresh();
  } catch (error) {
    console.error('Error adding a new post:', error);
  }
};

const deletePost = async (id) => {
  try {
    await toast.promise(
      fetch(`${API_URI}/${id}`, {
        method: 'DELETE',
      }),
      {
        loading: 'Deleting Post...',
        success: 'Post deleted successfully!',
        error: 'Failed to delete the post. Please try again later.',
      }
    );

    const updatedPosts = posts.filter((post) => post._id !== id);
    setPosts(updatedPosts);
  } catch (error) {
    console.error('Error deleting a post:', error);
  }
};

  // Inside your Blog component
  const updatePost = async (updatedPost) => {
    console.log(updatedPost);
    try {
      await toast.promise(
        fetch(`${API_URI}/${updatedPost._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPost),
        }),
        {
          loading: 'Updating Post...',
          success: 'Post updated successfully!',
          error: 'Failed to update the post. Please try again later.',
        }
      );
  
      setEditingPost(null); // Reset the editing post state
      setIsModalOpen(false);
      refresh();
    } catch (error) {
      console.error('Error updating the post:', error);
    }
  };

const addComment = async (postId, commentText) => {
  try {
    await toast.promise(
      fetch(`${API_URI}/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: commentText }),
      }),
      {
        loading: 'Adding comment...',
        success: 'Comment added successfully!',
        error: 'Failed to add a new comment. Please try again later.',
      }
    );

    refresh();

  } catch (error) {
    console.error('Error adding a new comment:', error);
  }
};


const deleteComment = async (postId, commentId, refresh) => {
  try {
    await toast.promise(
      fetch(`${API_URI}/${postId}/comments/${commentId}`, {
        method: 'DELETE',
      }),
      {
        loading: 'Deleting Comment...',
        success: 'Comment deleted successfully!',
        error: 'Failed to delete the comment. Please try again later.',
      }
    );

    refresh();
  } catch (error) {
    console.error('Error deleting the comment:', error);
  }
};

useEffect(() => {
  fetchData();
}, [change]);

  return (
    <>
      <Header />

      <div className='pt-10 bg-dark'>
        <br />
        <h2 className='text-white font-bold text-5xl text-center'>HeroChronicles</h2>
        <div>
          {posts && posts.map((post) => (
            <div key={post._id} className='mt-4 p-4 bg-gray-800 rounded'>
              <h3 className='text-xl font-bold text-white'>{post.title}</h3>
              <p className='text-gray-400'>{post.description}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => toggleBody(post._id)}
              >
                {visibleBodies[post._id] ? 'Hide Body' : 'Show Body'}
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mx-2 rounded mt-2"
                onClick={() => {
                  setEditingPost(true)
                  setPostToEdit(post)
                  setIsModalOpen(true)
                }}
              >
                Update Post
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded mt-2"
                onClick={() => deletePost(post._id)}
              >
                Delete Post
              </button>
              {visibleBodies[post._id] && post.body.map((section) => (
                <div key={section.subtitle} className='mt-2'>
                  <h4 className='text-lg font-semibold text-white'>{section.subtitle}</h4>
                  <p className='text-gray-400 ml-4'>{section.point}</p>
                </div>
              ))}
            {/* //Comment Section  */}
            <div className='mt-4'>
              <div>
              <h4 className='text-lg font-semibold text-white'>Comments:</h4>
              <button
                className="bg-gray-500 hover:bg-black text-white font-bold py-1 px-2 rounded mt-1"
                onClick={() => {
                  setPostIdComment(post._id)
                  setIsCommentModalOpen(true)
                }}
              >
                Add Comment
              </button>
                
              </div>
              {post.comments.length > 0 ?
                post.comments.map((comment) => (
                  <div key={comment._id} className='mt-2'>
                    <div>
                    <p className='text-gray-400'>{comment.text}</p>
                    <p className='text-red-200'>{comment.createdAt}</p>
                    </div>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-1"
                      onClick={() => deleteComment(post._id, comment._id)}
                    >
                      Delete Comment
                    </button>
                  </div>
                )) : <p className='text-gray-400'>No comments yet</p>
              }
                </div>  
              
              {/* */}
             
                
            {/* // */}
            </div>
          ))}
        </div>
      </div>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded mt-5"
        onClick={() => {
          setEditingPost(false)
          setIsModalOpen(true)
          setPostToEdit(null)
        }}
      >
        Add Post
      </button>

      <ModalBlog
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        addPost={addPost}
        onSubmit={editingPost ? updatePost : addPost}
        editPost={editingPost}
        postToEdit = {postToEdit} // Pass the editing post
      />  

      <ModalComment
        isOpen={isCommentModalOpen}
        closeModal={() => setIsCommentModalOpen(false)}
        addComment={addComment}
        postId={postIdComment}
      />

     <ToastContainer />
    </>
  );
}

export default Blog;
