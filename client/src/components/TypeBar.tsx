import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  TypeDeviceType,
  setTypeIdActionType,
  setBrandIdActionType,
} from '../store/reducer/deviceReducer'; //типизация

//----типизация пропсов----
type PropsType = {
  types: TypeDeviceType[];
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;
};
//-------------------------

const useStyles = makeStyles(() => ({
  list: {
    width: '100%',
    maxHeight: 300,
    overflow: 'auto',
  },
}));

const TypeBar: React.FC<PropsType> = ({ types, setTypeId, setBrandId }) => {
  const classes = useStyles();
  const history = useHistory(); //для изменения строки запроса
  //запись выбранного типа устройства в стейт и удаление существующего брэнда из стейта и маршрутизация
  const handleDevice = (id: string) => {
    history.push(`/profileType/${id}`);
    setTypeId(id);
    setBrandId(null);
  };

  return (
    <>
      <List
        component="nav"
        aria-label="main mailbox folders"
        className={classes.list}
      >
        {types &&
          types.map((type) => {
            return (
              <div key={type._id}>
                <ListItem
                  button
                  onClick={() => {
                    handleDevice(type._id);
                  }}
                >
                  <ListItemText primary={type.name} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
      </List>
    </>
  );
};

export default TypeBar;
