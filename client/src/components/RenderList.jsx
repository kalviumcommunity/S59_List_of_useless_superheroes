import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Modal } from '@mui/material';
import AddCard from './ViewAddCard';
import { useAuth } from './AuthContext';

const RenderCard = ({ hero, deleteCard }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { token, setToken } = useAuth();
  
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className="m-4">
          <img 
            src={hero.Image}
            alt={hero['Hero Name']}
            className="object-cover object-top w-full h-96"
          />
          <CardContent>
            <Typography variant="h6" className="mb-2">
              {hero['Hero Name']}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Superpower: {hero['Superpower']}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              First Appearance: {hero['First Appearance']}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Costume Quirk: {hero['Costume Quirk']}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Catchphrase: {hero['Catchphrase']}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Backstory: {hero['Backstory']}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Most Useless Moment: {hero['Most Useless Moment']}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Card By: {hero['created_by']}
            </Typography>
            <br />
            <div className='flex justify-between'>
            <Button variant="contained" color="primary" onClick={openModal}>
              View Details
            </Button>
            {token && <Button variant="outlined" color="error" onClick={()=>{deleteCard(hero._id, token);{console.log(hero._id)}}}>
              Delete
            </Button>}
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Modal open={modalOpen} onClose={closeModal} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white rounded-lg overflow-hidden w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-4">
    <h2 className='font-bold text-center text-red-400 text-2xl mb-4'>{hero['Hero Name']}</h2>
    <img src={hero.Image} className='object-cover object-top w-full h-96 mb-4' alt={hero['Hero Name']} />
    <p className="mb-2"><span className="font-bold">Superpower:</span> {hero['Superpower']}</p>
    <p className="mb-2"><span className="font-bold">First Appearance:</span> {hero['First Appearance']}</p>
    <p className="mb-2"><span className="font-bold">Costume Quirk:</span> {hero['Costume Quirk']}</p>
    <p className="mb-2"><span className="font-bold">Catchphrase:</span> {hero['Catchphrase']}</p>
    <p className="mb-2"><span className="font-bold">Backstory:</span> {hero['Backstory']}</p>
    <p className="mb-2"><span className="font-bold">Most Useless Moment:</span> {hero['Most Useless Moment']}</p>
    <br />
    <Button variant="contained" color="primary" onClick={closeModal} className="w-full">
      Close
    </Button>
  </div>
</Modal>

    </>
  );
};



const RenderList = ({ data, code, refresh, deleteCard }) => {
  const { token, setToken } = useAuth();
  // console.log(data);
  return (
    <Grid container spacing={3} className="p-4">
      {data.map((hero) => (
        <RenderCard deleteCard={deleteCard} key={hero._id} hero={hero} />
      ))}
      <AddCard token={token} refresh={refresh} code={code} />
    </Grid>
  );
};

export default RenderList;
