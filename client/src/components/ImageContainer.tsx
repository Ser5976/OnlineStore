import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  jumbo2: {
    backgroundImage: "url('/images/os5.png')",
    backgroundRepeat: 'no-repeat fixed bottom',
    backgroundSize: 'cover',
    color: '#efefef',
    height: '400px',
    position: 'relative',
    zIndex: -2,
    top: 0,
  },
  jumbo: {
    backgroundImage: "url('/images/os9.png')",
    backgroundRepeat: 'no-repeat fixed bottom',
    backgroundSize: 'cover',
    color: '#efefef',
    height: '400px',
    position: 'relative',
    zIndex: -2,
    top: 0,
  },
  overlay: {
    backgroundColor: '#000',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  imageContainer: {
    display: 'none',
    '@media (min-width:600px)': {
      marginTop: '20px',
      display: 'flex',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'initial',
  },
}));

const ImageContainer = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.imageContainer}>
      <Grid item sm={6}>
        <Container maxWidth="md">
          <div className={classes.jumbo2}>
            <div className={classes.overlay}></div>
          </div>
        </Container>
      </Grid>
      <Grid item sm={6}>
        <div className={classes.jumbo} style={{ marginRight: '20px' }}>
          <div className={classes.overlay}></div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ImageContainer;
