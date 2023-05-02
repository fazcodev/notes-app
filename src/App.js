import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Notes from './Components/Notes/Notes';
import ArchivedNotes from './Components/Notes/ArchiveNotes';
import DeletedNotes from './Components/Notes/DeletedNotes';
import DataProvider from './Components/Helpers/DataProvider'
import { AuthProvider } from './Components/Authentication/AuthContext';
import PrivateRoute from './Components/Authentication/PrivateRoute';
import SignIn from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';
function App() {

  return (
    <Router>
        <AuthProvider>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<DataProvider><Home /></DataProvider>}> 
                <Route path='/' element={<Notes/>} />
                <Route path='/Archive' element={<ArchivedNotes/>} />
                <Route path='/Trash' element={<DeletedNotes/>} />
              </Route>

            </Route>
            <Route path='*' element='404 Page Note Found!!' />
          </Routes>
        </AuthProvider>
    </Router>
    // <TrialLayout></TrialLayout>
  );
}

export default App;   
