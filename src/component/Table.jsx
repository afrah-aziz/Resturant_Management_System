import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import './Styles.css'; // Import the CSS file


export default function Mui() {
  const [data, setData] = useState([]);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  
  
  

  useEffect(() => {
    const datas = JSON.parse(localStorage.getItem("orders")) || [];
    setData(datas);
  }, [data]);

  const handleDelete = (index) => {
    // Open the delete confirmation dialog and store the row to delete
    setRowToDelete(index);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (rowToDelete !== null) {
      // Remove the row from the table data
      const updatedData = [...data];
      updatedData.splice(rowToDelete, 1);
      setData(updatedData);

      // Update the local storage data
      localStorage.setItem('orders', JSON.stringify(updatedData));

      // Close the delete confirmation dialog
      setDeleteConfirmationOpen(false);
      setRowToDelete(null);
    }
  };

  const handleDeleteCancelled = () => {
    // Close the delete confirmation dialog without deleting the row
    setDeleteConfirmationOpen(false);
    setRowToDelete(null);
  };


  // 1234
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
  const { name, value } = e.target;
  const qty = parseFloat(value);
  const gst = selectedItem.totalPrice * 7 / 100;
  const total = selectedItem.totalPrice * qty + gst;

  setState({...selectedItem,[e.target.name]:e.target.value,totalBill:total})


  setSelectedItem({
    ...selectedItem,
    [name]: value,
    totalBill: total.toFixed(2), // Ensure it's formatted as a string with two decimal places
  });

  setBill(total.toFixed(2)); // Also update the bill state
};














console.log(state);
const calculateTotalPrice = () => {
  const { price, quantity, tax } = formData;
  const totalPrice = (parseFloat(price) * parseInt(quantity)) * (1 + tax / 100);
  return totalPrice.toFixed(2);
};
let initialOrders
if(localStorage.getItem("orders")===null || 0){
  initialOrders=[]
}else{
  initialOrders = JSON.parse(localStorage.getItem("orders"))
}
const [orders, setOrders]=useState(initialOrders)

  
const handleSubmit = () => {
  // Find the index of the selected item in the orders state
  const itemIndex = orders.findIndex((item) => item.oid === selectedItem.oid);

  if (itemIndex !== -1) {
    // Create an updated item object with the edited values
    const updatedItem = {
      oid: selectedItem.oid,
      ...selectedItem,
      quantity: state.quantity,
      tax: state.tax,
      totalPrice: state.totalPrice,
    };

    // Update the orders state by replacing the item at the found index
    orders[itemIndex] = updatedItem;

    // Update the local storage with the updated orders data
    localStorage.setItem('orders', JSON.stringify(orders));
    setData(orders)

    // Close the edit dialog
    setOpen(false);
  }
};

// 1234

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        {/* ... (App bar code remains the same) ... */}
        
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
            <Link to="/waiter">
              <Button
                color="inherit"
                style={{
                  color: 'brown',
                  backgroundColor: 'white',
                  border: '1px solid brown',
                  borderRadius: '999px',
                  padding: '6px 20px',
                  marginRight:'20px',
                  
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                sx={{ '&:hover': { backgroundColor: 'brown', color: 'white' } }}
              >
                Add Order
              </Button>
            </Link>
            <Link to="/item">
              <Button
                color="inherit"
                style={{
                  color: 'brown',
                  backgroundColor: 'white',
                  border: '1px solid brown',
                  borderRadius: '90px',
                  padding: '5px 20px',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                sx={{ '&:hover': { backgroundColor: 'brown', color: 'white' } }}
              >
                Item Prepared
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

      <TableContainer component={Paper} sx={{ margin: '50px', backgroundColor: '#f0f0f0', maxWidth: '1740px', borderRadius: '8px', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: 'black', color: 'white' }}>DISH</TableCell>
              <TableCell colSpan={2} style={{ backgroundColor: 'black', color: 'white' }}>ItemName</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'black', color: 'white' }}>Quantity</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'black', color: 'white' }}>Amount</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'black', color: 'white' }}>Total Price</TableCell>
              <TableCell align="right" colSpan={2} style={{ backgroundColor: 'black', color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {/* ... (Rest of the table row code remains the same) ... */}
                <TableCell component="th" scope="row">
            <div>
              <img src={row.imageLink} style={{ width: "100px" }} alt={row.name} />
            </div>
          </TableCell>
          <TableCell align="left">{row.name}</TableCell>
          <TableCell align="left">{row.itemName}</TableCell> {/* Assuming itemName is the item name */}
          <TableCell align="right">{row.quantity}</TableCell>
          <TableCell align="right">{row.totalPrice}</TableCell>
          <TableCell align="right">{row.totalBill}</TableCell>
          <TableCell align="right">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleClickOpen(row)}
                  style={{ marginRight: '20px' }} // Adjust the margin to control spacing
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(index)}
                >
                  Cancel
                </Button>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={handleDeleteCancelled}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this row?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancelled} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
  {/* ... (Rest of the dialog content remains the same) ... */}
  <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          
            Please enter the details of the item.
          
          
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
            value={state.quantity} // Use state.quantity
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
  );
}
