import React, { createContext, useState } from 'react';
import { createPriceByDateMap } from '../utils';

export const PriceByDateContext = createContext();

const PriceByDateContextProvider = ({ children }) => {
    const [priceByDate, setPriceByDate] = useState(createPriceByDateMap);

    // keep Map in state to avoid recreating it on every period calculation
    return (
        <PriceByDateContext.Provider value={{ priceByDate, setPriceByDate }}>
            {children}
        </PriceByDateContext.Provider>
    );
}

export default PriceByDateContextProvider;
