import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

//----типизация пропсов----
type PropsType = {
  setAlertMessage: (data: string | null) => void;
  alertMessage: string | null;
};
//-------------------------

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertMessage: React.FC<PropsType> = ({
  setAlertMessage,
  alertMessage,
}) => {
  const classes = useStyles();

  return (
    <Alert
      severity="error"
      onClose={() => {
        setAlertMessage(null);
      }}
    >
      {alertMessage}
    </Alert>
  );
};

export default AlertMessage;
