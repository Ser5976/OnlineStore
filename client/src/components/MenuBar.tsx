import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  TypeDeviceType, // типизация типов устройст
  setBrandIdActionType, //типизация экшена запись брэнда в стейт
  setTypeIdActionType, //типизация экшена запись типа в стейт
} from '../store/reducer/deviceReducer';

//----типизация пропсов----
type PropsType = {
  types: TypeDeviceType[];
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;
};
//-------------------------
const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    marginTop: '25px',
  },

  span: {
    // display: 'block',
    '@media (max-width:600px)': {
      display: 'none',
    },
  },
}));

const MenuBar: React.FC<PropsType> = ({ types, setBrandId, setTypeId }) => {
  const history = useHistory();
  const classes = useStyles();
  // для меню
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //--------------------------
  //запись выбранного типа устройства в стейт и удаление существующего брэнда из стейта и маршрутизация
  const handleDevice = (id: string) => {
    history.push(`/profileType/${id}`);
    setTypeId(id);
    setBrandId(null);
  };
  return (
    <>
      <Container maxWidth="md">
        <List component="nav" style={{ display: 'flex', margin: '0 auto' }}>
          <ListItem
            button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleOpenMenu}
          >
            <ListItemText
              disableTypography
              primary={
                <Typography align="center">
                  <MenuIcon
                    style={{
                      display: 'initial-flex',
                      verticalAlign: 'middle',
                      marginRight: '10px',
                    }}
                  />
                  <span className={classes.span}>Каталог</span>
                </Typography>
              }
            />
          </ListItem>

          <ListItem button>
            <ListItemText
              primary={<Typography align="center">Оплата</Typography>}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary={<Typography align="center">Доставка</Typography>}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary={<Typography align="center">Контакты</Typography>}
            />
          </ListItem>
        </List>
      </Container>
      <Divider />
      <Menu
        variant="menu"
        elevation={2}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        className={classes.menu}
        onClose={handleClose}
      >
        {types &&
          types.map((type) => {
            return (
              <div key={type._id}>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleDevice(type._id);
                  }}
                >
                  <ListItemText
                    primary={<Typography>{type.name}</Typography>}
                  />
                </MenuItem>
              </div>
            );
          })}
      </Menu>
    </>
  );
};

export default MenuBar;
