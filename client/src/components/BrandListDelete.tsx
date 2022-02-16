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

import { BrandType } from '../store/reducer/deviceReducer'; //типизация

//----типизация пропсов----
type PropsType = {
  brands: BrandType[]; // типизация выбранного списка брэндов
  removeBrand: (id: string, showAlert: () => void) => void; //  типизация удаление брэнда
  showAlert: () => void;
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

const BrandListDelete: React.FC<PropsType> = ({
  brands, //список брэндов
  removeBrand, //удаление брэнда
  showAlert, // показывает алерт,результат удаления
}) => {
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
            <Typography style={{ fontWeight: 'bold' }}>
              Удалить брэнд товара
            </Typography>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          {brands.map((item) => {
            return (
              <div key={item._id}>
                <ListItem
                  button
                  className={classes.listType}
                  onClick={() => {
                    if (
                      window.confirm(
                        `Вы действительно хотите удалить брэнд ${item.name} ?`
                      )
                    ) {
                      removeBrand(item._id, showAlert);
                    }
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

export default BrandListDelete;
