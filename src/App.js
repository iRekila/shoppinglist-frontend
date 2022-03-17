import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist/';



function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');


  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data)
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });

  }, [])

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({ description: item, amount: amount })
    axios.post(URL + 'add.php', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })


      .then((response) => {
        setItems(items => [...items, response.data]);
        setItem('');
        setAmount('');
      }).catch(error => {
        alert(error.response.data.error)
      })
  }

  function remove(id) {
    const json = JSON.stringify({ id: id })
    axios.post(URL + 'delete.php', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const newListWithoutRemoved = items.filter((item) => item.id !== id);
        setItems(newListWithoutRemoved);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      })
  }



  return (
    <div className="container">
      <h3>Shopping list</h3>
      <form onSubmit={save}>
        <label>New item </label>
        <input placeholder="type item" value={item} onChange={e => setItem(e.target.value)} />
        <input placeholder="type amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <button>Add</button>
      </form>
      <ul>
        {items?.map(item => (
          <a class="item" key={item.id}>
            {item.id && item.description}&nbsp;
            <a class="amount" key={item.id}>
              {item.id && item.amount}&nbsp; </a>
            <a className="delete" onClick={() => remove(item.id)} href="#">
              Delete items
            </a>
            <br></br>
          </a>
        ))}
      </ul>
    </div>
  );
}



export default App;

