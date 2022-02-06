import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Box, Typography } from '@material-ui/core';
import { StorefrontSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    marginTop: 'auto', //для футера, что бы прижать футер к низу страницы
    paddingTop: 25,
    height: 150,
  },

  login: {
    fontFamily: 'Permanent Marker',
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '2.5rem',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box bgcolor="#0047ae" color="#e0e0e0" className={classes.appBar}>
      <Container
        maxWidth="sm"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography
          align="center"
          style={{
            display: 'flex',
          }}
          className={classes.login}
        >
          Online
          <StorefrontSharp style={{ fontSize: '60px' }} />
          Store
        </Typography>
      </Container>
    </Box>
  );
};
export default Footer;
