import React from 'react';
import RegisterForm from './Component/RegisterForm';
import { UserProvider } from './Component/Usecontext';

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <RegisterForm />
      </UserProvider>
    </div>
  );
};

export default App;
