import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FoodCard from '../components/FoodCard';

export default function Home(){
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    axios.get('/api/foods').then(r=>setFoods(r.data)).catch(()=>{});
  },[]);

  const add = (f) => {
    const existing = cart.find(i=>i.food._id===f._id);
    if(existing){ setCart(cart.map(i=> i.food._id===f._id ? {...i, quantity:i.quantity+1} : i)); }
    else setCart([...cart, {food: f, quantity:1, price: f.price}]);
    localStorage.setItem('filiya_cart', JSON.stringify(cart));
    alert('Added to cart');
  };

  return (
    <div>
      <h2>Popular dishes</h2>
      <div className="cards">
        {foods.map(f=> <FoodCard key={f._id} food={f} onAdd={add} />)}
      </div>
    </div>
  );
}
