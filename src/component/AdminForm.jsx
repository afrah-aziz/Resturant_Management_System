import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminForm({ onAddItem }) {
  const navigate = useNavigate(); // Get the navigation function from React Router
  let initialValue
  if(localStorage.getItem("items")===null){
    initialValue=[]
  }else{
    initialValue = JSON.parse(localStorage.getItem("items"))
  }
  const [value, setValue]=useState(initialValue)

  console.log(value)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageLink: '',
    totalPrice: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let itemId = value.length===0? 1 : value[value.length-1].iid + 1
    const newItem = {
      iid:itemId,
      name: formData.name,
      description: formData.description,
      imageLink: formData.imageLink,
      totalPrice: formData.totalPrice,
    };

    // Store the new item in local storage
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    storedItems.push(newItem);
    localStorage.setItem('items', JSON.stringify(storedItems));
    console.log(newItem);

    // Call the onAddItem function to pass the new item to the higher-level component
    onAddItem(newItem);

    // Clear the form fields
    setFormData({
      name: '',
      description: '',
      imageLink: '',
      totalPrice: '',
    });

    navigate('/order');
  };

  // Inline CSS styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'url("https://img.freepik.com/premium-photo/abstract-blur-cafe-coffee-shop_1339-93361.jpg?w=2000") no-repeat center center fixed',
    backgroundSize: 'cover',
  };

  const cardStyle = {
    background: '#C4A484',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '8px',
    width: '400px', // Adjust the card width as needed
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    color:'#5C4033',
    
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 0px',
    marginBottom: '20px',
    backgroundColor:'#EADDCA'
  };
  
  // const buttonStyle = {
  //   background: '#5C4033', // Brown background
  //   color: 'black', // Dark brown text
  //   padding: '10px 20px',
  //   border: 'none',
  //   borderRadius: '4px',
  //   cursor: 'pointer',
  //   margin:'10px 0px 0px 0px'
  // };

  return (

    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={labelStyle}>Insert New Item</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Description:</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Image Link:</label>
            <input
              type="url"
              value={formData.imageLink}
              onChange={(e) => setFormData({ ...formData, imageLink: e.target.value })}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Total Price:</label>
            <input
              type="number"
              value={formData.totalPrice}
              onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <div>
    <button
      type="submit"
      style={{
        background: '#5C4033', // Brown background
        color: 'black', // Dark brown text
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '100px', // Add right margin to separate the buttons
      }}
    >
      Add Item
    </button>
  </div>

  <div>
    <Link to="/order">
      <button
        type="submit"
        style={{
          background: '#5C4033', // Brown background
          color: 'black', // Dark brown text
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '100px', // Add right margin to separate the buttons


        }}
      >
        Close
      </button>
    </Link>
  </div>
</div>

        </form>
      </div>
    </div>
  );
}
