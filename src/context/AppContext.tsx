import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {List} from '../types/contextTypes';

type AppContextProps = {
  lists: List[];
  setLists: Dispatch<SetStateAction<List[]>>;
};

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  const [lists, setLists] = useState<List[]>([]);

  return (
    <AppContext.Provider
      value={{
        lists,
        setLists,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
