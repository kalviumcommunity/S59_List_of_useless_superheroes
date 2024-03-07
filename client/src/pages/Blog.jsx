import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Modal from 'react-modal';
import ModalBlog from '../components/ModalBlog';
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

  const fetchData = async () => {
    toast.info("Fetching Data.....")
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
      toast.success('Data fetched successfully!');
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
    toast.info("Adding Post.....")
    try {
      const response = await fetch(API_URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Failed to add a new post');
      }

      const updatedPosts = await response.json();
      setIsModalOpen(false);
      toast.success('Post added successfully!');
      refresh();
    } catch (error) {
      console.error('Error adding a new post:', error);
      toast.error('Error adding a new post. Please try again later.');
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_URI}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the post');
      }

      const updatedPosts = posts.filter((post) => post._id !== id);
      setPosts(updatedPosts);
      toast.error('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting a post:', error);
      toast.error('Error deleting a post. Please try again later.');
    }
  };
  // Inside your Blog component
const updatePost = async (updatedPost) => {
  console.log(updatedPost);
  try {
    const response = await fetch(`${API_URI}/${updatedPost._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    });

    if (!response.ok) {
      throw new Error('Failed to update the post');
    }

    const updatedPosts = await response.json();
    setEditingPost(null); // Reset the editing post state
    setIsModalOpen(false);
    toast.success('Post updated successfully!');
    refresh();
  } catch (error) {
    console.error('Error updating the post:', error);
    toast.error('Error updating the post. Please try again later.');
  }
};


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
     <ToastContainer />
    </>
  );
}

export default Blog;
