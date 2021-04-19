import React, { useContext, useState } from 'react';
import { RentsDataContext } from '../contexts/RentsDataContext';

import DatePicker from '../components/DatePicker';
import Error from '../components/Error';

const EditableTableBody = ({ disableSaveButton }) => {
    const { rentsData, dispatch } = useContext(RentsDataContext);
    const [error, setError] = useState(false);

    function changePrice(id, price) {
        dispatch({ type: 'price-per-day', payload: { id, price } });
    }

    function changeFromDate(id, date, toDate) {
        dispatch({ type: 'from-date', payload: { id, date } });
        valiDate(date, toDate);
    }

    function changeToDate(id, date, fromDate) {
        dispatch({ type: 'to-date', payload: { id, date } });
        valiDate(fromDate, date);
    }

    function valiDate(fromDate, toDate) {
        if (!fromDate || !toDate) {
            setError('Error: Invalid date!'); //firefox
            disableSaveButton(true);
        } else if (fromDate > toDate) {
            setError('Error: Starting date exceeds ending date!');
            disableSaveButton(true);
        } else {
            setError(false);
            disableSaveButton(false);
        }
    }

    return (
        <tbody>
            {rentsData.map((record, index) =>
                <tr key={index}>
                    <td>
                        <DatePicker
                            value={record.from}
                            onChange={e => changeFromDate(index, e.target.value, record.to)}
                        />
                    </td>
                    <td>
                        <DatePicker
                            value={record.to}
                            onChange={e => changeToDate(index, e.target.value, record.from)}
                        />
                    </td>
                    <td>
                        <input
                            type='number'
                            min='0'
                            step='any'
                            value={record.price_per_day}
                            onChange={e => changePrice(index, e.target.value)}
                        />
                    </td>
                    <td>{record.added}</td>
                </tr>
            )}
            {error &&
                <tr>
                    <td colSpan='4'>
                        <Error message={error} />
                    </td>
                </tr>
            }
        </tbody>
    );
}

export default EditableTableBody;
