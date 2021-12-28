import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

//----типизация пропсов----
type PropsType = {};
//-------------------------
const useStyles = makeStyles(() => ({
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

const MenuAdmin: React.FC<PropsType> = ({}) => {
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

  return (
    <>
      <Button color="inherit" onClick={handleOpenMenu}>
        <SupervisorAccountOutlinedIcon
          style={{ fontSize: '35px', color: 'black' }}
        />
      </Button>

      <Menu
        variant="menu"
        elevation={2}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        className={classes.menu}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            history.push('/addDevicesContainer');
          }}
        >
          Добавить товар
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push('/deleteContainer');
          }}
        >
          Удалить товар
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuAdmin;
