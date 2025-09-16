import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <div className="nav">
      <div style={{fontWeight:700}}>Filiya</div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/orders">My Orders</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
