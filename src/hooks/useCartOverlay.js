import React, { createContext, useContext, useState } from 'react';

const CartUIContext = createContext();

export const CartUIProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [onAdd, setOnAdd] = useState(() => () => {});

  const show = (addCallback) => {
    //setOnAdd(() => addCallback);
    setVisible(true);
  };

  const hide = () => {
    console.log('CartUIProvider: hide');
    setVisible(false);
  };

  return (
    <CartUIContext.Provider value={{ visible, show, hide, onAdd }}>
      {children}
    </CartUIContext.Provider>
  );
};

export const useCartUI = () => useContext(CartUIContext);
