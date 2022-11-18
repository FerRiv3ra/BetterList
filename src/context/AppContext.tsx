import React, {createContext, Dispatch, SetStateAction, useState} from 'react';

type AppContextProps = {
  lists: List[];
  setLists: Dispatch<SetStateAction<List[]>>;
};

type List = {
  type: 'shopping' | 'todo';
  title: string;
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
