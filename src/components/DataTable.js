import React, { useContext, useState } from 'react';
import { PriceByDateContext } from '../contexts/PriceByDateContext';
import { RentsDataContext } from '../contexts/RentsDataContext';

import EditableTableBody from './EditableTableBody';
import StaticTableBody from './StaticTableBody';
import Button from '../components/Button';

import { createPriceByDateMap } from '../utils';


const DataTable = () => {
    const { setPriceByDate } = useContext(PriceByDateContext);
    const { rentsData, dispatch } = useContext(RentsDataContext);

    const [editMode, setEditMode] = useState(false);
    const [saveDisabled, setSaveDisabled] = useState(false);

    function saveChanges() {
        localStorage.setItem('data', JSON.stringify(rentsData));
        setPriceByDate(createPriceByDateMap);
        setEditMode(false);
    }

    function cancelChanges() {
        dispatch({ type: 'cancel-changes' });
        setEditMode(false);
    }

    // callback from EditableTableBody component
    function disableSaveButton(bool) {
        setSaveDisabled(bool);
    }

    return (
        <div>
            <table className='table'>
                <caption>Rent periods price list:</caption>
                <thead>
                    <tr>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Price Per Day</th>
                        <th>Date added</th>
                    </tr>
                </thead>
                {editMode ? <EditableTableBody disableSaveButton={disableSaveButton} /> : <StaticTableBody />}
            </table>
            <div className='buttons'>
                {editMode
                    ?
                    <>
                        <Button disabled={saveDisabled} onClick={saveChanges} title='Save' />
                        <Button onClick={cancelChanges} title='Cancel' />
                    </>
                    :
                    <Button onClick={() => setEditMode(true)} title='Edit' />
                }
            </div>
        </div>
    );
}

export default DataTable;
