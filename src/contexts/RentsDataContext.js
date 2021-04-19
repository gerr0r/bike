import React, { createContext, useReducer, useEffect } from 'react';
import RentsDataReducer from '../reducers/RentsDataReducer';
import { mockData } from '../mock-db';
import { initData } from '../utils';

export const RentsDataContext = createContext();

const RentsDataContextProvider = ({ children }) => {
    const [rentsData, dispatch] = useReducer(RentsDataReducer, null, initData);

    // on first render set data from db to local storage if not present already
    useEffect(() => {
        if (localStorage.getItem('data')) return;
        localStorage.setItem('data', JSON.stringify(mockData));
    }, [])

    return (
        <RentsDataContext.Provider value={{ rentsData, dispatch }}>
            {children}
        </RentsDataContext.Provider>

    );
}

export default RentsDataContextProvider;
