import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import {
  TypeDeviceType, // типизация типов устройст
  setBrandIdActionType, //типизация экшена запись брэнда в стейт
  setTypeIdActionType, //типизация экшена запись типа в стейт
} from '../store/reducer/deviceReducer';

//----типизация пропсов----
type PropsType = {
  types: TypeDeviceType[];
  isFetchErrorTypes: boolean;
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;
};
//-------------------------
const useStyles = makeStyles(() => ({
  menu: {
    marginTop: '25px',
  },
  typography: {
    color: '#e0e0e0',
    '&:hover': {
      color: '#fff',
    },
    cursor: 'pointer',
  },
  span: {
    // display: 'block',
    '@media (max-width:600px)': {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'none',
  },
}));

const MenuBar: React.FC<PropsType> = ({
  types,
  isFetchErrorTypes,
  setBrandId,
  setTypeId,
}) => {
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
      <Box display="flex" bgcolor="#0047ae" marginBottom={3}>
        <Container maxWidth="md">
          <List component="nav" style={{ display: 'flex', margin: '0 auto' }}>
            <ListItem
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleOpenMenu}
            >
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    align="center"
                    style={{
                      display: 'flex',
                    }}
                    className={classes.typography}
                  >
                    <MenuIcon
                      style={{
                        marginRight: '10px',
                      }}
                    />
                    <span className={classes.span}>Каталог</span>
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Link to="/paymetPage" className={classes.link}>
                    <Typography align="center" className={classes.typography}>
                      Оплата
                    </Typography>
                  </Link>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={
                  <Link to="/deliveryPage" className={classes.link}>
                    <Typography align="center" className={classes.typography}>
                      Доставка
                    </Typography>
                  </Link>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={
                  <Link to="/contactPage" className={classes.link}>
                    <Typography align="center" className={classes.typography}>
                      Контакты
                    </Typography>
                  </Link>
                }
              />
            </ListItem>
          </List>
        </Container>
      </Box>

      <Menu
        variant="menu"
        elevation={2}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        className={classes.menu}
        onClose={handleClose}
      >
        {isFetchErrorTypes ? (
          <Typography align="center" color="error" style={{ margin: '15px' }}>
            Что-то пошло не так!
          </Typography>
        ) : (
          types &&
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
          })
        )}
      </Menu>
    </>
  );
};

export default MenuBar;
