import React, { useContext, useEffect, useState } from 'react';
import { PriceByDateContext } from '../contexts/PriceByDateContext';
import { calcRent, todayDate } from '../utils';

import DatePicker from '../components/DatePicker';
import Button from '../components/Button';
import Error from '../components/Error';

const RentsForm = () => {
    const { priceByDate } = useContext(PriceByDateContext);

    const [fromDate, setFromDate] = useState(todayDate);
    const [toDate, setToDate] = useState(todayDate);
    const [totalPrice, setTotalPrice] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!fromDate || !toDate) {
            setError('Error: Invalid date!'); //firefox
        } else if (fromDate > toDate) {
            setError('Error: Starting date exceeds ending date!');
        } else {
            setError(false);
        }

        setTotalPrice(null);
    }, [fromDate, toDate]);

    useEffect(() => {
        setTotalPrice(null);
    }, [priceByDate]);

    function calculateTotalRent(e) {
        e.preventDefault();
        setTotalPrice(calcRent(fromDate, toDate, priceByDate));
    }

    return (
        <form onSubmit={e => calculateTotalRent(e)}>
            <div>
                <p className='header'>Select period to calculate rent:</p>
                <DatePicker value={fromDate} onChange={e => setFromDate(e.target.value)} />
                <span> - </span>
                <DatePicker value={toDate} onChange={e => setToDate(e.target.value)} />
            </div>
            {error && <Error message={error} />}
            <div className='buttons'>
                <Button type='submit' disabled={Boolean(error)} title='Calculate Rent' />
            </div>
            {totalPrice &&
                <div className='total'>
                    <p className='header'>Total rent price for selected period:</p>
                    <h2>{`${totalPrice}`}&euro;</h2>
                </div>
            }
        </form>
    );
}

export default RentsForm;
