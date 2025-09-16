import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('/api/auth/register', { name, email, password });
      localStorage.setItem('filiya_token', res.data.token);
      localStorage.setItem('filiya_user', JSON.stringify(res.data.user));
      alert('Registered');
      nav('/');
    }catch(e){ alert('Failed to register'); }
  };

  return (
    <div style={{maxWidth:400}}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required /></div>
        <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
        <div><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
        <button className="button" style={{marginTop:8}}>Register</button>
      </form>
    </div>
  );
}
