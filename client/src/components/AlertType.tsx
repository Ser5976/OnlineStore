import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { setTypeMessage } from '../store/reducer/deviceReducer';

//----типизация пропсов----
type PropsType = {
  setTypeMessage: (data: boolean) => void;
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

const AlertType: React.FC<PropsType> = ({ setTypeMessage }) => {
  const classes = useStyles();

  return (
    <Alert
      severity="error"
      onClose={() => {
        setTypeMessage(false);
      }}
    >
      Данный тип используется в других устройствах,чтобы удалить тип удалите все
      устройства с этим типом !
    </Alert>
  );
};

export default AlertType;
