import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';


const RenderCard = ({ hero }) => {
  return (
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
        </CardContent>
      </Card>
    </Grid>
  );
};

const RenderList = ({data}) => {
    console.log(data)
  return (
    <Grid container spacing={3} className="p-4">
      {data.map((hero) => (
        <RenderCard key={hero._id} hero={hero} />
      ))}
    </Grid>
  );
};

export default RenderList;
