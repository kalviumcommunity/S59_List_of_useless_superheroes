import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const PostModal = ({ isOpen, closeModal, onSubmit, postToEdit, editPost }) => {
  const [post, setPost] = useState({
    title: '',
    description: '',
    body: [{ subtitle: '', point: '' }],
  });

  useEffect(() => {
    // If postToEdit is provided, set the state with its values
    if (postToEdit) {
      setPost(postToEdit);
    } else {
      // Reset the state when the modal is opened for a new post
      setPost({ title: '', description: '', body: [{ subtitle: '', point: '' }] });
    }
  }, [isOpen, postToEdit]);

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
    console.log(post);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal">
      <div className="modal-content">
        <h2>{postToEdit ? 'Edit Post' : 'Add New Post'}</h2>
        <label>Title:</label>
        <input type="text" name="title" value={post.title} onChange={handleInputChange} />

        <label>Description:</label>
        <textarea name="description" value={post.description} onChange={handleInputChange} />

        <label>Body:</label>
        {post.body.map((point, index) => (
          <div key={index} className="body-input">
            <input
              type="text"
              value={point.subtitle}
              onChange={(e) => handlePointChange(index, e.target.value, 'subtitle')}
              placeholder="Subtitle"
            />
            <input
              type="text"
              value={point.point}
              onChange={(e) => handlePointChange(index, e.target.value, 'point')}
              placeholder="Point"
            />
            <button type="button" onClick={() => handleRemovePoint(index)}>
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
