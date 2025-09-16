import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Cart(){
  const [cart, setCart] = useState([]);
  useEffect(()=>{
    const c = JSON.parse(localStorage.getItem('filiya_cart') || '[]');
    setCart(c);
  },[]);

  const placeOrder = async () => {
    const token = localStorage.getItem('filiya_token');
    if(!token){ alert('Login first'); return; }
    try{
      const items = cart.map(i=>({ food: i.food._id, quantity: i.quantity, price: i.price }));
      const res = await axios.post('/api/orders', { items, deliveryAddress: 'Home Address', paymentMethod: 'stripe' }, { headers:{ Authorization: 'Bearer '+token } });
      if(res.data.clientSecret){
        alert('Payment intent created (Stripe). Finish payment on frontend - placeholder.');
      } else {
        alert('Order placed!');
      }
      localStorage.removeItem('filiya_cart');
      setCart([]);
    }catch(e){ console.error(e); alert('Failed to place order'); }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <div className="cards">
        {cart.map((c, idx)=> (
          <div className="card" key={idx}>
            <h4>{c.food.name}</h4>
            <div>Qty: {c.quantity}</div>
            <div>Price: ₹{c.price}</div>
          </div>
        ))}
      </div>
      <button className="button" onClick={placeOrder} style={{marginTop:12}}>Place Order</button>
    </div>
  );
}
