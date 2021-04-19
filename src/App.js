import './App.css';

import DataTable from './components/DataTable';
import RentsForm from './components/RentsForm';

import RentsDataContextProvider from './contexts/RentsDataContext';
import PriceByDateContextProvider from './contexts/PriceByDateContext';

function App() {

  return (
    <PriceByDateContextProvider>
      <div className="container">
        <p className='header'>Bike Rent Calculator</p>
        <RentsDataContextProvider>
          <DataTable />
        </RentsDataContextProvider>
        <RentsForm />
      </div>
    </PriceByDateContextProvider>
  );
}

export default App;
