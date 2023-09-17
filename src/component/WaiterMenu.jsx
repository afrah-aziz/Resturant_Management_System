import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField'; // Update the path to match your project structure
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function OrderMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch menu items from local storage when the component mounts
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setMenuItems(storedItems);
  }, []);

  const cardStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '20px',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '20px',
    height: '300px',
    position:'relative',
    top:'60px'
  };
console.log(menuItems,'menuItems');
//   const addItemToLocalStorage = (item, index) => {
//     // Get the existing items from local storage or an empty array
//     const storedItems = JSON.parse(localStorage.getItem('items')) || [];

//     // Add the new item to the list of stored items with a unique key based on the index
//     const key = `item_${index}`;
//     const newItem = {
//       name: item.name,
//       totalPrice: item.totalPrice,
//     };

//     // Store the new item in local storage
//     localStorage.setItem(key, JSON.stringify(newItem));

//     // Update the state to reflect the changes
//     const updatedItems = [...storedItems, newItem];
//     setMenuItems(updatedItems);

//     // Navigate to the table page
//     navigate('/table');
//   };

//   1234
const [open, setOpen] = useState(false);
const [selectedItem,setSelectedItem]=useState("")
const [formData, setFormData] = useState({
  id: '',
  date: '',
  itemName: '',
  price: '',
  quantity: '',
  tax: 7,
  storedItem: [],
});

// Fetch item name and price from local storage when the component mounts
useEffect(() => {
    const storedItem = JSON.parse(localStorage.getItem('selectedItem')) || [];
    setFormData({
      ...formData,
      storedItem: storedItem || [], // Set storedItem to the parsed array
    });
  }, []);

const handleClickOpen = (item) => {
  setOpen(true);

    console.log(item)
    const ab = item;
    setSelectedItem(ab)
};
console.log(selectedItem)
const handleClose = () => {
  setOpen(false);
};

const [bill,setBill]=useState(0)
const [state,setState]=useState("")
const handleInputChange = (e) => {
    console.log(e.target.value)
    const qty=(e.target.value)
    const gst = selectedItem.totalPrice * 7/100
    const total=selectedItem.totalPrice * qty + gst
    console.log(total)
    setState({...selectedItem,[e.target.name]:e.target.value,totalBill:total})

    setBill(total) 
//   const { name, value } = e.target;
//   setFormData({ ...formData, [name]: value });
};
console.log(state);
const calculateTotalPrice = () => {
  const { price, quantity, tax } = formData;
  const totalPrice = (parseFloat(price) * parseInt(quantity)) * (1 + tax / 100);
  return totalPrice.toFixed(2);
};

// const handleSubmit = () => {
//     // Get the existing items from local storage or an empty array
//     const storedItems = JSON.parse(localStorage.getItem('selectedItem')) || [];
  
//     // Add the new item to the list of stored items
//     const newItem = {
//       id: formData.id,
//       date: formData.date,
//       itemName: formData.itemName,
//       price: formData.price,
//       quantity: formData.quantity,
//       tax: formData.tax,
//       totalPrice: calculateTotalPrice(),
//     };
  
//     // Update the state to reflect the changes
//     const updatedItems = [...storedItems, newItem];
//     setMenuItems(updatedItems);
  
//     // Store the updated list in local storage
//     localStorage.setItem('selectedItem', JSON.stringify(updatedItems));
  
//     // Handle other submission logic here, e.g., close the dialog, etc.
//     setOpen(false);
//   };
let initialOrders
if(localStorage.getItem("orders")===null || 0){
  initialOrders=[]
}else{
  initialOrders = JSON.parse(localStorage.getItem("orders"))
}
const [orders, setOrders]=useState(initialOrders)

  
  const handleSubmit = async() => {

    console.log(state)
    let orderId = orders.length===0 ? 1 : orders[orders.length-1].oid + 1
    const newItem = {
      oid:orderId,
      ...state
    };
    orders.push(newItem);
    localStorage.setItem('orders', JSON.stringify(orders));
    console.log(orders)
    // localStorage.setItem('orders', JSON.stringify(newOrder));
    await setOpen(false);
    // Get the existing items from local storage or an empty array
    // const storedItems = JSON.parse(localStorage.getItem('selectedItem')) || [];
  
    // Add the new item to the list of stored items
    // const newItem = {
    //   id: formData.id,
    //   date: formData.date,
    //   itemName: formData.itemName,
    //   price: formData.price,
    //   quantity: formData.quantity,
    //   tax: formData.tax,
    //   totalPrice: calculateTotalPrice(),
    // };
  
//     // Update the state to reflect the changes
//     const updatedItems = [...storedItems, newItem];
//     setMenuItems(updatedItems);
  
//     // Store the updated list in local storage
//     localStorage.setItem('selectedItem', JSON.stringify(updatedItems));
  
//     // Handle other submission logic here, e.g., close the dialog, etc.
//     setOpen(false);
//   };

//   setMenuItems((prevItems) => [...prevItems, newItem]);

//   // Store the updated list in local storage
//   localStorage.setItem('items', JSON.stringify(menuItems));
//   setOpen(false);
};

  

 
 const [search,setSearch]=useState([])
  const [dummy, setDummy]=useState()
 const handleChange=(e)=>{
   let variable=e.target.value.toLowerCase()
   let searchterms=menuItems?.filter((item)=>item?.name.toLowerCase().includes(variable))
   console.log(searchterms);
   if(searchterms.length>0){
   setSearch(searchterms)
   } else {
    setDummy("No data")
   }
 }
 console.log(search,'searchterms')
//  console.log(search)
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'brown' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Waiter DashBoard
            </Typography>
            
            <Link to="/table">
            <Button
              color="inherit"
              style={{
                color: 'brown',
                backgroundColor: 'white',
                border: '1px solid brown',
                borderRadius: '999px', // Use a high value to create an oval shape
                padding: '6px 20px',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              sx={{ '&:hover': { backgroundColor: 'brown', color: 'white' } }}
            >
              View Order
            </Button>
          </Link>

          <Link to="/">
            <Button
              color="inherit"
              style={{
                color: 'brown',
                backgroundColor: 'white',
                border: '1px solid brown',
                margin:'0px 0 0 20px',
                borderRadius: '999px', // Use a high value to create an oval shape
                padding: '6px 20px',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              sx={{ '&:hover': { backgroundColor: 'brown', color: 'white' } }}
            >
              LogOut
            </Button>
          </Link>
          </Toolbar>
        </AppBar>
      </Box>



      <TextField
  label="Search"
  onChange={(e) => handleChange(e)}
  style={{
    borderRadius: '10px', // Use a high value to create an oval shape
    backgroundColor: 'white',
    marginTop: '30px', // Add margin to shift it downward
    width: '30%', // Increase width to 40%
    border: 'none', // Remove the border
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    ),
  }}
/>





<div style={cardContainerStyle}>
{search.length>0?(
  search.map((item,index)=>{
    return (
     <div key={index} className="menu-card" style={cardStyle}>
     <Card sx={{ width: 350, maxWidth: '100%', boxShadow: 'lg' }}>
       <CardMedia component="img" height="200" image={item.imageLink} alt="" />
       <CardContent>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold', height: '10px' }} component="div">
             <h3 style={{ margin: '5px auto' }}>{item.name}</h3>
           </Typography>
         </div>
         <br />
         <Typography variant="body2">
           <p style={{ textAlign: 'justify' }}>{item.description}</p>
         </Typography>
         <br />
         <div>
           <Typography level="body-xs">Total price:</Typography>
           <Typography fontSize="lg" fontWeight="lg">
             {item.totalPrice}
           </Typography>
         </div>
       </CardContent>
      <Button
     color="inherit"
     variant='container'
     style={{ background: 'brown', color: 'white' }}
     onClick={()=>handleClickOpen(item)}
     >
     ORDER ITEM
     </Button>
     
   
     </Card>
   </div>
    )
     })
):(
  menuItems.map((item,index)=>{
    return (
      <div key={index} className="menu-card" style={cardStyle}>
  <Card sx={{ width: 350, maxWidth: '100%', boxShadow: 'lg' }}>
    <CardMedia component="img" height="200" image={item.imageLink} alt="" />
    <CardContent>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold', height: '10px' }} component="div">
          <h3 style={{ margin: '5px auto' }}>{item.name}</h3>
        </Typography>
      </div>
      <br />
      <Typography variant="body2">
        <p style={{ textAlign: 'justify' }}>{item.description}</p>
      </Typography>
      <br />
      <div>
        <Typography level="body-xs">Total price:</Typography>
        <Typography fontSize="lg" fontWeight="lg">
          {item.totalPrice}
        </Typography>
      </div>
    </CardContent>
   <Button
  color="inherit"
  variant='container'
  style={{ background: 'brown', color: 'white' }}
  onClick={()=>handleClickOpen(item)}
  >
  ORDER ITEM
  </Button>
  
  
  </Card>
  </div>
    )
  })
) 
  
}
     


        
       
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the item.
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="id"
            name="id"
            label="ID"
            type="text"
            fullWidth
            value={formData.id}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="date"
            name="date"
            label="Date"
            type="date"
            fullWidth
            value={formData.date}
            onChange={handleInputChange}
          /> */}
          <TextField
            margin="dense"
            id="itemName"
            name="itemName"
            label="Item Name"
            type="text"
            fullWidth
            disabled
            value={selectedItem.name}
            onChange={(e)=>handleInputChange(e.target.value)}
          />
          <TextField
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={selectedItem.totalPrice}
            onChange={(e)=>handleInputChange(e.target.value)}
          />
          <TextField
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            fullWidth
            // value={formData.quantity}
            onChange={handleInputChange}
          />
          
          <TextField
            margin="dense"
            id="tax"
            name="tax"
            label="Tax (%)"
            type="number"
            fullWidth
            value={formData.tax}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="totalPrice"
            name="totalPrice"
            label="Total Price"
            type="number"
            fullWidth
            disabled
            value={bill}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}
