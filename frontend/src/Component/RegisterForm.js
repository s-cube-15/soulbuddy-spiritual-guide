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
  const [City, setCity] = useState(user.City);

  const [message , setMessage] = useState("")

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const userData = { name, email, password };

    try {
      
      const response = await axios.post('http://localhost:5000', user);
      setMessage(response.data.message);  // Show success message
      document.location.hash = "/showchart"
    } catch (error) {
      setMessage('Error registering user!');
      console.error(error);
      document.location.hash = "/showchart"

    }
  };

  return (
    <div className="RegisterForm card p-5">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='form-label'>Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='form-label'>Date Of Birth:</label>
          <input
            type="date"
            className="form-control"

            value={dob}
            onChange={(e) => setdob(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='form-label'>Time Of Birth:</label>
          <input
            type="time"
            className="form-control"

            value={tob}
            onChange={(e) => settob(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='form-label'>Gender:</label>
          <input
            type="text"
            className="form-control"

            value={Gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </div>
        <div className='form-label'>
          <label>State:</label>
          <input
            type="text"
            className="form-control"

            value={State}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className='form-label'>
          <label>City:</label>
          <input
            type="text"
            className="form-control"

            value={City}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='btn btn-outline-primary'>Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
