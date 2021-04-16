import { useState } from 'react';
import './App.css';
import { calcRent, todayDate } from './utils'


function App() {
  const [fromDate, setFromDate] = useState(todayDate)
  const [toDate, setToDate] = useState(todayDate)

  return (
    <div className="App">
      <p>Bike Rent Calculator</p>
      <div>
        <label>From:
        <input type='date' value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </label>
      </div>
      <div>
        <label>To:
        <input type='date' value={toDate} onChange={e => setToDate(e.target.value)} />
        </label>
      </div>
      {fromDate > toDate && <p>Starting date exceeds ending date</p> }
      <div>
        <button onClick={() => calcRent(fromDate, toDate)} disabled={!fromDate || !toDate || fromDate > toDate}>Calculate Rent</button>
      </div>
    </div>
  );
}

export default App;
