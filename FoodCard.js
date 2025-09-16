import React from 'react';

export default function FoodCard({food, onAdd}){
  return (
    <div className="card">
      <img src={food.image || 'https://via.placeholder.com/200'} style={{width:'100%', height:120, objectFit:'cover', borderRadius:6}} alt={food.name} />
      <h4>{food.name}</h4>
      <div className="small">{food.description}</div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8}}>
        <strong>₹{food.price}</strong>
        <button className="button" onClick={()=>onAdd(food)}>Add</button>
      </div>
    </div>
  );
}
