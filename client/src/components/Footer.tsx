import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Box, Grid, Typography, Link } from '@material-ui/core';
import Logo1 from '../img/logo1.png';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
    position: 'relative',
  },

  login: {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      bgcolor="#0910a4"
      color="white"
      className={classes.appBar}
    >
      <img src={Logo1} style={{ position: 'absolute', top: '0', left: '0' }} />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}></Grid>
          <Grid item xs={false} sm={3}></Grid>
          <Grid item xs={12} sm={3}>
            <Box>Компания</Box>
            <Box>
              <Link href="/" color="inherit">
                Вакансия
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                О проекте
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Наши партнёры
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Обратная связь
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box>Покупателю</Box>
            <Box>
              <Link href="/" color="inherit">
                Права потребителя
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Вопросы-ответы
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Пользовательское соглашение
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Политика конфиденциальности
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Footer;
