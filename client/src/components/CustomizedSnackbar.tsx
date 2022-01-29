import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

//----типизация пропсов----
type PropsType = {
  setOpen: (data: boolean) => void;
  open: boolean;
  errorBasket: boolean;
};
//-------------------------

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbars: React.FC<PropsType> = ({
  setOpen,
  errorBasket,
  open,
}) => {
  const classes = useStyles();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {errorBasket ? (
          <Alert onClose={handleClose} severity="error">
            Товар не добавлен в корзину, что то пошло не так!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Товар добавлен в корзину!
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};
export default CustomizedSnackbars;
