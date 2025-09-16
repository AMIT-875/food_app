import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function AdminDashboard(){
  const [stats, setStats] = useState({restaurants:0, foods:0, orders:0});
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    const token = localStorage.getItem('filiya_token');
    if(!token) return;
    // fetch admin stats (we'll approximate by calling endpoints)
    axios.get('/api/restaurants').then(r=>setStats(s=>({...s, restaurants: r.data.length}))).catch(()=>{});
    axios.get('/api/foods').then(r=>setStats(s=>({...s, foods: r.data.length}))).catch(()=>{});
    axios.get('/api/orders', { headers: { Authorization: 'Bearer '+token } }).then(r=>{ setStats(s=>({...s, orders: r.data.length})); setOrders(r.data); }).catch(()=>{});
  },[]);

  const updateStatus = (id, status) => {
    const token = localStorage.getItem('filiya_token');
    axios.put('/api/orders/'+id+'/status', { status }, { headers:{ Authorization: 'Bearer '+token } }).then(r=>{ alert('Updated'); window.location.reload(); }).catch(()=>{ alert('Failed'); });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{display:'flex', gap:12}}>
        <div className="card">Restaurants<br/><strong style={{fontSize:22}}>{stats.restaurants}</strong></div>
        <div className="card">Foods<br/><strong style={{fontSize:22}}>{stats.foods}</strong></div>
        <div className="card">Orders<br/><strong style={{fontSize:22}}>{stats.orders}</strong></div>
      </div>

      <h3 style={{marginTop:18}}>Recent Orders</h3>
      <div className="cards" style={{marginTop:12}}>
        {orders.map(o=> (
          <div className="card" key={o._id}>
            <div className="small">User: {o.user?.email || o.user}</div>
            <div>Status: {o.status}</div>
            <div>Total: ₹{o.total}</div>
            <div style={{marginTop:8}}>
              <button className="button" onClick={()=>updateStatus(o._id,'preparing')}>Mark Preparing</button>
              <button className="button" style={{marginLeft:6}} onClick={()=>updateStatus(o._id,'on-the-way')}>On the way</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
