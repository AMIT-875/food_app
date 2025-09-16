import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('filiya_token', res.data.token);
      localStorage.setItem('filiya_user', JSON.stringify(res.data.user));
      alert('Logged in');
      nav('/');
    }catch(e){ alert('Login failed'); }
  };

  return (
    <div style={{maxWidth:400}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
        <div><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
        <button className="button" style={{marginTop:8}}>Login</button>
      </form>
    </div>
  );
}
