import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

//----типизация пропсов----
type PropsType = {
  setOpen: (data: boolean) => void;
  setDeleteError: ((data: null) => void) | null;
  open: boolean;
  mistake: boolean | string | null;
  errorMessage: string | null;
  successMessage: string;
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
  setOpen, //функция для закрытия алерта
  mistake, // ошибка
  open, // открывает алерт
  errorMessage, // сообщение ошибки
  successMessage, //сообщение удачных действий
  setDeleteError, // удаление ошибки из стейта
}) => {
  const classes = useStyles();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    if (setDeleteError) {
      setTimeout(() => {
        setDeleteError(null);
      }, 300);
    }
  };
  // console.log(mistake);
  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {mistake ? (
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            {successMessage}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};
export default CustomizedSnackbars;
