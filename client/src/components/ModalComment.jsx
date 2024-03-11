import React, { useState } from 'react';
import Modal from 'react-modal'; 

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    // width: '300px', // Adjust the width as needed
    // height: '200px', // Adjust the height as needed
  },
};

function ModalComment({ isOpen, closeModal, addComment, postId }) {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    // Add any validation if needed
    if (commentText.trim() !== '') {
      addComment(postId, commentText);
      setCommentText('');
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className='flex flex-col'>
        <h2 className='font-bold text-2xl'>Add a Comment</h2>
        <textarea
          rows="4"
          cols="50"
          className='border-2 border-gray-300 p-2 mt-2 mb-2'
          placeholder="Type your comment here..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className='bg-red-300 p-2 rounded-xl hover:bg-red-600 w-fit mx-auto' onClick={handleAddComment}>Add Comment</button>
      </div>
    </Modal>
  );
}

export default ModalComment;
