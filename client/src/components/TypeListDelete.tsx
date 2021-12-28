import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { TypeDeviceType } from '../store/reducer/deviceReducer'; //типизация

//----типизация пропсов----
type PropsType = {
  types: TypeDeviceType[]; //типизация списка типов устройств
  removeType: (id: string) => void; //типизация удаления выбранного типа
};
//-------------------------
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 20,
    padding: '0px 5px',
  },
  list: { paddingLeft: theme.spacing(2) },

  listType: {
    paddingLeft: theme.spacing(9),
    color: '#9e9e9e',
  },
}));

const TypeListDelete: React.FC<PropsType> = ({ types, removeType }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List component="nav" className={classes.root}>
      <ListItem className={classes.list} button onClick={handleClick}>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="h6" gutterBottom>
              Удалить тип товара
            </Typography>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          {types.map((item) => {
            return (
              <div key={item._id}>
                <ListItem
                  button
                  className={classes.listType}
                  onClick={() => {
                    removeType(item._id);
                  }}
                >
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography variant="subtitle1">{item.name}</Typography>
                    }
                  />
                  <ListItemIcon style={{ color: 'red' }}>
                    <HighlightOffIcon />
                  </ListItemIcon>
                </ListItem>
              </div>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
};

export default TypeListDelete;
