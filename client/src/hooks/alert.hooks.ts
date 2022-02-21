import React, { useState } from 'react';

export const useAlert = () => {
  const [show, setShow] = useState(false);
  const showAlert = () => {
    setShow(true);
    console.log('showAlert');
    console.log(show);
  };
  return { show, showAlert, setShow };
};
