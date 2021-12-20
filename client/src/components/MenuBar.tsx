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
import { Link } from 'react-router-dom';
import { TypeDeviceType } from '../store/reducer/deviceReducer';
import { types } from 'util';

//----типизация пропсов----
type PropsType = {
  types: TypeDeviceType[];
};
//-------------------------
const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    marginTop: '58px',
  },
  link: {
    textDecoration: 'none',
    color: 'initial',
  },
  span: {
    // display: 'block',
    '@media (max-width:600px)': {
      display: 'none',
    },
  },
}));

const MenuBar: React.FC<PropsType> = ({ types }) => {
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
        elevation={0}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        className={classes.menu}
        onClose={handleClose}
      >
        {types &&
          types.map((type) => {
            return (
              <MenuItem onClick={handleClose} key={type._id}>
                {' '}
                <Link to="/" className={classes.link}>
                  {type.name}
                </Link>
              </MenuItem>
            );
          })}
      </Menu>
    </>
  );
};

export default MenuBar;
