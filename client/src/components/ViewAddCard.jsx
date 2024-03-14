import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Button,
  Modal,
  TextField,
} from "@mui/material";


import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddCard = ({code, refresh, token}) => {

    const API_URI = `http://localhost:5000/content/${code}`;
   
    const [user, setUser] = useState('Anonymous');
    const [modalOpen, setModalOpen] = useState(false);

    const [formData, setFormData] = useState({
              created_by: user,
              'Image': "",
              'Hero Name': "",
              'Real Name': "",
              'Superpower': "",
              'First Appearance': "",
              'Costume Quirk': "",
              'Catchphrase': "",
              'Backstory': "",
              'Most Useless Moment': "",
          });
  

  
   

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
        const response = await fetch(API_URI, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add a new Card. Please try again later.');
        }
        setModalOpen(false);
        refresh();
        console.log('Card added successfully!');
        toast.success('Card added successfully!');
      } catch (error) {
        console.error('Error adding a new post:', error);
        toast.error(error.message || 'Failed to add a new Card. Please try again later.')
      }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const clearFields = () => {
    setFormData({
      created_by: user,
      'Image': "",
      'Hero Name': "",
      'Real Name': "",
      'Superpower': "",
      'First Appearance': "",
      'Costume Quirk': "",
      'Catchphrase': "",
      'Backstory': "",
      'Most Useless Moment': "",
    });
  }

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const userNameCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("userName=")
    );
  
    if (userNameCookie) {
      const userNameValue = userNameCookie.split("=")[1];
      setUser(userNameValue);
    //   console.log(userNameValue);
    }
  }, []);

  useEffect(()=>{
    console.log(user);
    setFormData({
        ...formData,
        created_by: user,
        });
  },[user]) 

  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className="flex w-96 justify-center items-center "
      >
        <Card className="m-4 w-full">
          <CardContent className="h-96 flex flex-col justify-center items-center">
            <Button variant="contained" color="primary" onClick={openModal}>
              Add Card
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Modal open={modalOpen} onClose={closeModal}>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
          <div className="modal-content p-4 bg-white rounded-lg w-3/5 shadow-lg z-50">
            <h2 className="text-2xl font-bold mb-4">Add Card</h2>
            <TextField
              name="Hero Name"
              label="Hero Name"
              variant="outlined"
              className="mb-4"
              fullWidth
              value={formData['Hero Name']}
              onChange={handleInputChange}
            />
            <br />
            <TextField
              name="Superpower"
              label="Superpower"
              variant="outlined"
              className="mb-4"
              fullWidth
              value={formData['Superpower']}
              onChange={handleInputChange}
            />
            <br />
            <TextField
              name="First Appearance"
              label="First Appearance"
              variant="outlined"
              className="mb-4"
              fullWidth
              value={formData['First Appearance']}
              onChange={handleInputChange}
            />
            <br />
            <TextField
              name="Costume Quirk"
              label="Costume Quirk"
              variant="outlined"
              className="mb-4"
              fullWidth
              value={formData['Costume Quirk']}
              onChange={handleInputChange}
            />
            <br />
            <TextField
              name="Catchphrase"
              label="Catchphrase"
              variant="outlined"
              className="mb-4"
              fullWidth
              value={formData['Catchphrase']}
              onChange={handleInputChange}
            />
            <br />
            <TextField
              name="Backstory"
              label="Backstory"
              variant="outlined"
              className="mb-4"
              fullWidth
              value={formData['Backstory']}
              onChange={handleInputChange}
            />
            <br />
            <TextField
              name="Most Useless Moment"
              label="Most Useless Moment"
              variant="outlined"
              className="mb-4"
              fullWidth
              value={formData['Most Useless Moment']}
              onChange={handleInputChange}
            />
             <TextField
              name="Real Name"
              label="Real Name"
              variant="outlined"
              className="mb-4"
              fullWidth
              value={formData['Real Name']}
              onChange={handleInputChange}
            />
            <TextField
              name="Image"
              label="Image"
              variant="outlined"
              className="mb-4"
              fullWidth
              value={formData['Image']}
              onChange={handleInputChange}
            />
            <div className="flex w-full justify-between items-center mt-4 ">
            <Button variant="contained" color="primary" onClick={() => { closeModal(); handleSubmit(); }}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => { closeModal(); clearFields(); }}>
            Cancel
            </Button>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default AddCard;
