import React, { useState, } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './styles/login.css';
const Login = () => {
 
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setMessageLog] = useState('');
  const navigate = useNavigate();

  const login = (email, password) => {
    fetch('/login', {
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
        if(data.messageError){
        
          console.log('Respuesta recibida desde el puto servidor', data.messageError);
          setMessageLog(data.messageError);
          throw new Error(data.messageError);
        }

          localStorage.setItem('token', data.token);

          navigate('/dashboard');

      })
      .catch(error => {

        console.error('Error en el inicio de sesión:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const clearMessage = () => {
    setMessageLog(''); 
  };
  
  return (<div className='mainLogin'>
   <div className='img-login'>
    
    </div>
    <div className='login'>
    <div className='login-box'>
      <h1 className='h1-login'>Login</h1>
 
      {loginMessage && (
          <div style={{ color: 'white', marginBottom: '10px' , backgroundColor: 'red', display: 'inline-block', padding:'10px', borderRadius: '5px'}}>
            {loginMessage}
            <button onClick={clearMessage} style={{ marginLeft: '10px', backgroundColor: 'white',cursor: 'pointer' , border:'none', padding: '2px', borderRadius: '5px'}}>❌</button>
          </div>
        )}
        
      <form onSubmit={handleSubmit}  className='form-login'>
        <input
          type="text"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          className="input-login"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-login"
        />
        <button type="submit" className="btn-login">Login</button>
        <Link to="/signup" className="btn-login-count">
        you don&apos;t have an account
        </Link>
      </form>
    </div>
    </div>


    
    </div>
  );
  
};

export default Login;