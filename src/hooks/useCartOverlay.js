import React, { createContext, useContext, useState } from 'react';

const CartUIContext = createContext();

export const CartUIProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [productDetail, setproductDetail] = useState();
  const [onAdd, setOnAdd] = useState(() => () => {});

  const show = (productDetail) => {
    // setOnAdd(() => addCallback);
    setproductDetail(productDetail);
    setVisible(true);
  };

  const hide = () => {
    console.log('CartUIProvider: hide');
    setVisible(false);
  };

  return (
    <CartUIContext.Provider value={{ visible, productDetail, show, hide, onAdd }}>
      {children}
    </CartUIContext.Provider>
  );
};

export const useCartUI = () => useContext(CartUIContext);
