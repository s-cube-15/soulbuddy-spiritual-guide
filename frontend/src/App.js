import React from 'react';
import RegisterForm from './Component/RegisterForm';
import { UserProvider } from './Component/Usecontext';
import { Route, Routes, HashRouter } from 'react-router-dom';
import ShowChart from './Component/ShowChart';

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <HashRouter>
          <Routes>
            <Route path="/" exact element={<RegisterForm/>} />
            <Route path="showchart" exact element={<ShowChart/>} />
          </Routes>
        </HashRouter>
      </UserProvider>
    </div>
  );
};

export default App;
