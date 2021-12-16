import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Box, Grid, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
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
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 12 }}
        bgcolor="primary.main"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.login}
              >
                OnlineStore
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box>Статьи</Box>
              <Box>
                <Link href="/" color="inherit">
                  Новинки
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Советы
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Обзоры
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Обратите внимание
                </Link>
              </Box>
            </Grid>
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
    </footer>
  );
};
export default Footer;
