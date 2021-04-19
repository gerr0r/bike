import React, { useContext } from 'react';
import { RentsDataContext } from '../contexts/RentsDataContext';


const StaticTableBody = () => {
    const { rentsData } = useContext(RentsDataContext);

    return (
        <tbody>
            {rentsData.map((record, index) =>
                <tr key={index}>
                    <td>{record.from}</td>
                    <td>{record.to}</td>
                    <td>{record.price_per_day}</td>
                    <td>{record.added}</td>
                </tr>
            )}
        </tbody>
    );
}

export default StaticTableBody;
