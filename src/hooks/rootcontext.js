import React, { createContext, useState, useContext } from 'react';

const RootContext = createContext(null);

export const RootProvider= ({children}) => {
    // 
    const [category, setCategory] = useState([]);

    return (
    <RootContext.Provider value={{
      category, setCategory
    }}>
      {children}
    </RootContext.Provider>
  );
}

export const useRootContext = () => useContext(RootContext);