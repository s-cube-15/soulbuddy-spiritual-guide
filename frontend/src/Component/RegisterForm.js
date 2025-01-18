import React, { use, useState } from 'react';
import axios from 'axios';
import { User } from './Usecontext';
import { useContext } from 'react';

const RegisterForm = () => {

  const {user, setUser} = useContext(User)

  const [name, setName] = useState(user.Name);
  const [dob, setdob] = useState(user.dob);
  const [tob, settob] = useState(user.tob);
  const [Gender, setGender] = useState(user.Gender);
  const [State, setState] = useState(user.State);
  const [city, setCity] = useState(user.city);

  const [message , setMessage] = useState("")

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const userData = { name, email, password };

    try {
      
      const response = await axios.post('http://localhost:5000', user);
      setMessage(response.data.message);  // Show success message
    } catch (error) {
      setMessage('Error registering user!');
      console.error(error);
    }
  };

  return (
    <div className="RegisterForm">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date Of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setdob(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time Of Birth:</label>
          <input
            type="time"
            value={tob}
            onChange={(e) => settob(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            value={Gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            value={State}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
