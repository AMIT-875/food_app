import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Restaurants(){
  const [list,setList] = useState([]);
  useEffect(()=>{
    axios.get('/api/restaurants').then(r=>setList(r.data)).catch(()=>{});
  },[]);
  return (
    <div>
      <h2>Restaurants</h2>
      <div className="cards">
        {list.map(r=> (
          <div className="card" key={r._id}>
            <h4>{r.name}</h4>
            <div className="small">{r.description}</div>
            <div style={{marginTop:8}}>{r.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
