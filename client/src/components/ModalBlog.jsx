import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const PostModal = ({ isOpen, closeModal, onSubmit, postToEdit, editPost, user }) => {
  console.log(user);
  const [post, setPost] = useState({
    author: user,
    title: '',
    description: '',
    body: [{ subtitle: '', point: '' }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleAddPoint = () => {
    setPost((prevPost) => ({
      ...prevPost,
      body: [...prevPost.body, { subtitle: '', point: '' }],
    }));
  };

  const handlePointChange = (index, value, field) => {
    setPost((prevPost) => {
      const updatedBody = [...prevPost.body];
      updatedBody[index][field] = value;
      return { ...prevPost, body: updatedBody };
    });
  };

  const handleRemovePoint = (index) => {
    setPost((prevPost) => {
      const updatedBody = [...prevPost.body];
      updatedBody.splice(index, 1);
      return { ...prevPost, body: updatedBody };
    });
  };

  const handleSubmit = () => {
    onSubmit(post);
    closeModal();
  };

  // useEffect(() => {
  //   if (user !== null) {
  //     setPost((prevPost) => ({
  //       ...prevPost,
  //       Author: user,
  //     }));
  //   }
  // }, [user]);

  useEffect(() => {
    if (postToEdit) {
      setPost(postToEdit);
    } else {
      setPost({author: user, title: '', description: '', body: [{ subtitle: '', point: '' }] });
    }
  }, [isOpen, postToEdit]);

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal">
      <div className="modal-content">
        <h2 className='text-center font-bold text-2xl text-red-600'>{postToEdit ? 'Edit Post' : 'Add New Post'}</h2>
        <label className='text-2xl font-bold'>Title:</label>
        <input className='border-4 min-h-12 text-xl' type="text" name="title" value={post.title} onChange={handleInputChange} />
        <br />
        <label>Description:</label>
        <textarea className='border-4 min-h-32 text-xl' name="description" value={post.description} onChange={handleInputChange} />
        <br />
        <label className='text-xl font-bold'>Body:</label>
        {post.body.map((point, index) => (
          <div key={index} className="body-input flex ">
            <input
              className='border-2 m-1 p-1'
              type="text"
              value={point.subtitle}
              onChange={(e) => handlePointChange(index, e.target.value, 'subtitle')}
              placeholder="Subtitle"
            />
            <input
              className='border-2 w-4/5 m-1 p-1'
              type="text"
              value={point.point}
              onChange={(e) => handlePointChange(index, e.target.value, 'point')}
              placeholder="Point"
            />
            <button className='bg-red-300 p-2 rounded-lg hover:bg-red-600' type="button" onClick={() => handleRemovePoint(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="add-point-button" onClick={handleAddPoint}>
          Add Point
        </button>

        <div className="button-container">
          <button onClick={handleSubmit} className="submit-button">
            {editPost ? 'Update Post' : 'Add Post'}
          </button>
          <button onClick={closeModal} className="close-button">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
