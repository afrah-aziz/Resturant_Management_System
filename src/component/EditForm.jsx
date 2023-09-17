import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function AdminForm({ onAddItem }) {
  const navigate = useNavigate(); // Get the navigation function from React Router

  let params = useParams();
  console.log(params)

  const [item,setItem]=useState({})

  useEffect(()=>{
    let alldata=JSON.parse(localStorage.getItem("items"))
    let singleItem=alldata.filter((item,index)=>{return index==params.id})
    console.log(singleItem)
    setItem(singleItem[0])
},[])
console.log(item)

// const handleItem=(e)=>{
//     setItem({...item,[e.target.name]:e.target.value})
// }
let nav=useNavigate();

const Update=()=>{
    let alldata=JSON.parse(localStorage.getItem("items"))
    alldata.splice(params.id,1,item)
    localStorage.setItem("items",JSON.stringify(alldata))
    nav('/order')
}










  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageLink: '',
    totalPrice: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
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
  
  const buttonStyle = {
    background: '#5C4033', // Brown background
    color: 'black', // Dark brown text
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (

    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={labelStyle}>Edit Item</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>Name:</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
            // onChange={handleItem}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Description:</label>
            <input
              type="text"
              value={item.description}
            //   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              onChange={(e) => setItem({ ...item, description: e.target.value })}

              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Image Link:</label>
            <input
              type="url"
              value={item.imageLink}
              onChange={(e) => setItem({ ...item, imageLink: e.target.value })}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Total Price:</label>
            <input
              type="number"
              value={item.totalPrice}
              onChange={(e) => setItem({ ...item, totalPrice: e.target.value })}
              style={inputStyle}
              required
            />
          </div>

          <div>
            <button type="submit" style={buttonStyle} onClick={Update}>SAVE</button>
          </div>
        </form>
      </div>
    </div>
  );
}
