import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';

function App() {

  const [foodName, setFoodName] = useState('');
  const [daysSinceAte, setDaysSinceAte] = useState(0);
  const [newFoodName, setNewFoodName] = useState('');

  const [foodList, setFoodList] = useState([]);

  const addToList= () => {
    if(foodName === ''){
      alert('Please enter a food name');
      return;
    }
    if(daysSinceAte === 0){
      alert('Please enter a number of days');
      return;
    }

    Axios.post("http://localhost:3001/insert", {foodName: foodName, daysSinceIAte: daysSinceAte});
  }
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, [foodList]);

  const updateFood = (id) => {
    if(newFoodName === ''){
      alert('Please enter a new food name');
      return;
    }
    Axios.put("http://localhost:3001/update", {id: id, newFoodName: newFoodName});
  }
  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }

  return (
    <>
    <div className='container col-3 '>
    <h1  className='d-flex justify-content-center'>CRUD App with MERN</h1>
    <div className='row '>
    <label className='d-flex justify-content-center'>Name</label>
    </div>
    <div className='row '>
    <input className='' onChange={(e) => {setFoodName(e.target.value);}} type="text"/>
    </div>
    <div className='row'>
    <label className='d-flex justify-content-center'>Amount</label>
    </div>
    <div className='row '>
    <input className='' onChange={(e) => {setDaysSinceAte(e.target.value);}} type="number"/>
    </div>
    <div className='row'>
    <button className='btn btn-primary mt-4' onClick={addToList}>Add to list</button>
    </div>
    <h1 className='d-flex justify-content-center '>Shopping list</h1>
    {foodList.map((val, key) => {
      return (
        <div key={key} className='container col-4 card mt-2'>
        <h3 className='row d-flex justify-content-center'>{val.foodName}</h3>
        <p className='row d-flex justify-content-center'>{val.daysSinceIAte}</p>
        
        <div className='row d-flex justify-content-center ' >
          <input type="text" onChange={(e) => {setNewFoodName(e.target.value);}} placeholder="New Food Name"/>
        <button className='btn btn-primary' onClick={()=> updateFood(val._id)}>Change</button>
        <button className='btn btn-danger' onClick={()=> deleteFood(val._id)}>Delete</button>
        </div>
        </div>
      );
    }
    )}
    </div>
    </>
    );
}

export default App;
