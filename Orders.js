import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Orders(){
  const [orders, setOrders] = useState([]);
  useEffect(()=>{
    const token = localStorage.getItem('filiya_token');
    if(!token) return;
    axios.get('/api/orders/my', { headers: { Authorization: 'Bearer '+token } }).then(r=>setOrders(r.data)).catch(()=>{});
  },[]);

  return (
    <div>
      <h2>My Orders</h2>
      <div className="cards">
        {orders.map(o=> (
          <div className="card" key={o._id}>
            <div className="small">Status: {o.status}</div>
            <div>Total: ₹{o.total}</div>
            <div className="small">Address: {o.deliveryAddress}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
