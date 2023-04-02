import React from 'react';
import './App.css';
import Home from './Components/Home';
import DataProvider from './Components/Helpers/DataProvider'
import AlertBox from './Components/Alert/AlertBox';
function App() {
  return (
    <DataProvider>
      <Home/>
      <AlertBox/>
    </DataProvider>
    
  );
}

export default App;   
