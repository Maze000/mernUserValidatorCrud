import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/signup.css';
import { Link } from 'react-router-dom';


const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [sigMessage, setMessageSig] = useState('');
  const navigate = useNavigate();

  const signup = (email, password) => {

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {

        return response.json();
      })
      .then(data => {

        if (data.messageError) {

          
          setMessageSig(data.messageError);
          throw new Error(data.messageError);
        }


        localStorage.setItem('token', data.token);


        navigate('/dashboard');

      })
      .catch(error => {
        console.error('Error in registration:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password);
  };
  const clearMessage = () => {
    setMessageSig('');
  };

  return (<div className='mainSignup'>

    <div className='Signup'>
      <div className='Signup-box'>
        <h1 className='h1-Signup'>SIGN UP</h1>
        {sigMessage && (
          <div style={{ color: 'white', marginBottom: '10px', backgroundColor: 'red', display: 'inline-block', padding: '10px', borderRadius: '5px' }}>
            {sigMessage}
            <button onClick={clearMessage} style={{ marginLeft: '10px', backgroundColor: 'white', cursor: 'pointer', border: 'none', padding: '2px', borderRadius: '5px' }}>❌</button>
          </div>
        )}
        <form onSubmit={handleSubmit} className='form-Signup'>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-Signup"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-Signup"
          />
          <button type="submit" className="btn-Signup"> Sign Up</button>
          <Link to="/login" className="btn-Signup-count">you have an account</Link>
        </form>
      </div>

    </div>

    <div className='img-Signup'>

    </div>
  </div>

  );

};

export default Signup;
