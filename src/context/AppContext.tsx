import React, {createContext, useState} from 'react';

type AppContextProps = {};

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppContext;
