import React, { useState, useContext } from 'react';
import axios from 'axios';
import { User } from './Usecontext';

const RegisterForm = () => {
  const { user, setUser } = useContext(User);

  const [name, setName] = useState(user?.name || '');
  const [dob, setDob] = useState(user?.dob || '');
  const [time, setTime] = useState(user?.time || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [state, setState] = useState(user?.state || '');
  const [city, setCity] = useState(user?.city || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(''); // Password should not be stored in context for security reasons

  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, dob, time, gender, state, city};

    try {
      console.log(userData)
      const response = await axios.post('http://localhost:5000/register', userData);
      setMessage(response.data.message); // Show success message
      setUser(userData); // Update context with the user data
    } catch (error) {
      setMessage('Error registering user!');
      console.error(error);
    }
  };

  return (
    <div className="RegisterForm card p-5">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Time of Birth:</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Gender:</label>
          <input
            type="text"
            className="form-control"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">State:</label>
          <input
            type="text"
            className="form-control"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">City:</label>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
       
        <button type="submit" className="btn btn-outline-primary">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
