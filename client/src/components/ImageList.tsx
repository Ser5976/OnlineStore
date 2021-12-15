import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ROOT_URL } from '../constants/url';
import { Box } from '@material-ui/core';

//типизация----------------------

type PropsType = {
  image: string[];
};
//---------------------------------

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // overflow: 'auto',
    marginTop: 5,
    padding: 5,
  },
  image: {
    height: 50,
    width: 'auto',
    margin: 5,
    cursor: 'pointer',
  },
}));

const LineImageList: React.FC<PropsType> = ({ image }) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0); //для выбора картинки
  return (
    <Box>
      <img
        src={`${ROOT_URL}/${image[index]}`}
        style={{ height: '250px', width: 'auto' }}
      />
      <div className={classes.root}>
        {image.map((item, index) => (
          <img
            key={item}
            src={`${ROOT_URL}/${item}`}
            alt="картинка"
            className={classes.image}
            onClick={() => {
              setIndex(index);
            }}
          />
        ))}
      </div>
    </Box>
  );
};
export default LineImageList;
