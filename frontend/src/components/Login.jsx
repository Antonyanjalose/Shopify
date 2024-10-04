import { useState, useContext } from 'react';
import { loginUser } from '../api/api';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(email, password);
      login(data.token);
    } catch (error) {
      console.log(error);
      alert('Login failed');
    }
  };

  const register = ()=>{
    navigate('/register')
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='form-section'>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      <button onClick={register}>Create an Account</button>
    </form>
    </div>
  );
};

export default Login;
