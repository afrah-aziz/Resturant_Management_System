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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List'; // Add this import
import ListItem from '@mui/material/ListItem'; // Add this import
import ListItemIcon from '@mui/material/ListItemIcon'; // Add this import
import ListItemText from '@mui/material/ListItemText'; // Add this import
import HomeIcon from '@mui/icons-material/Home'; // Add this import
import DashboardIcon from '@mui/icons-material/Dashboard'; // Add this import
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LogoutIcon from '@mui/icons-material/Logout';


// import EditItemForm from './EditItemForm';


export default function OrderMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track if editing is active
  const [editedItem, setEditedItem] = useState(null);
//  sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  // sidebar

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
  };

  const navigate = useNavigate();

  const handleMenuClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemIndex(index);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedItemIndex(null);
  };

  const handleEdit = () => {
    // Implement edit functionality here, e.g., navigate to an edit page.
    handleCloseMenu();

  };

  const handleDelete = () => {
    // Implement delete functionality here, e.g., remove the item from the menuItems state and local storage.
    const updatedItems = [...menuItems];
    updatedItems.splice(selectedItemIndex, 1);
    setMenuItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    handleCloseMenu();
  };

  // 1234
  // const handleEdit = (item) => {
  //   setIsEditing(true); // Enable editing mode
  //   setEditedItem(item); // Set the item being edited
  // };

  // // Function to handle save after editing
  // const handleSaveEdit = (editedItem) => {
  //   // Implement logic to save the edited item
  //   const updatedItems = menuItems.map((item) =>
  //     item === editedItem ? editedItem : item
  //   );
  //   setMenuItems(updatedItems);
  //   localStorage.setItem('items', JSON.stringify(updatedItems));

  //   setIsEditing(false); // Disable editing mode
  //   setEditedItem(null); // Clear the edited item
  // };

  // // Function to handle cancel during editing
  // const handleCancelEdit = () => {
  //   setIsEditing(false); // Disable editing mode
  //   setEditedItem(null); // Clear the edited item
  // };


  return (
    <div>
      <Drawer
  anchor="left" // You can change the anchor to 'right', 'top', or 'bottom' as needed
  open={isSidebarOpen}
  onClose={closeSidebar}
>
  {/* Sidebar content */}
  {/* You can add links or any content you want in the sidebar */}
  <div style={{ width: 250, padding: '16px' }}>
    <Typography variant="h5" gutterBottom style={{ fontFamily: "cursive", color: "brown" }}>
      Sidebar
    </Typography>
    <List>
      <ListItem style={{ textDecoration: 'none' }}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemText primary="Home" />
        </Link>
      </ListItem>
      <ListItem style={{ textDecoration: 'none' }}>
        <ListItemIcon>
          <RestaurantMenuRoundedIcon />
        </ListItemIcon>
        <Link to="/order" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemText primary="Menu" />
        </Link>
      </ListItem>
      <ListItem style={{ textDecoration: 'none' }}>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <Link to="/admin" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemText primary="Add New Menu" />
        </Link>
      </ListItem>
      {/* Add more links as needed */}
      <ListItem style={{ textDecoration: 'none' }}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <Link to="/waiter" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemText primary="Waiters Dashboard" />
        </Link>
      </ListItem>
      <ListItem style={{ textDecoration: 'none' }}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <Link to="/chefs" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemText primary="Chefs Dashboard" />
        </Link>
      </ListItem>
      <ListItem style={{ textDecoration: 'none' }}>
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <Link to="/table" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemText primary="View Customer Order" />
        </Link>
      </ListItem>
      <ListItem style={{ textDecoration: 'none' }}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemText primary="LogOut" />
        </Link>
      </ListItem>
    </List>
  </div>
</Drawer>

    
     

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'brown' }}>
          <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={openSidebar} // Add this line
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Menu
            </Typography>
            {/* <Link to='/admin'><Button color="inherit" style={{ color: 'white' }}>Insert New Menu</Button></Link> */}
            <Link to="/admin">
        <Button
          color="inherit"
          style={{
            color: 'brown', // Brown text color
            backgroundColor: 'white', // White background color
            border: '1px solid brown', // Brown border
            borderRadius: '90px', // Rounded corners
            padding: '6px 20px', // Padding
            transition: 'background-color 0.3s, color 0.3s', // Smooth hover transition
          }}
          sx={{ '&:hover': { backgroundColor: 'brown', color: 'white' } }} // Hover styles
        >
          Insert New Menu
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

      {/* 1234 */}
       {/* Display the EditItemForm if editing is active
       {isEditing && editedItem && (
        <EditItemForm
          item={editedItem}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )} */}

      <div style={cardContainerStyle}>
        {menuItems.map((item, index) => (
          <div key={index} className="menu-card" style={cardStyle}>
            <Card sx={{ width: 350, maxWidth: '100%', boxShadow: 'lg' }}>
              <CardMedia component="img" height="200" image={item.imageLink} alt="" />
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold', height: '10px' }} component="div">
                    <h3 style={{ margin: '5px auto' }}>{item.name}</h3>
                  </Typography>
                  <IconButton
                    aria-label="menu"
                    size="small"
                    onClick={(event) => handleMenuClick(event, index)}
                  >
                    <MenuIcon />
                  </IconButton>
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
              <Link to='/table'>
                <Button
                  color="inherit"
                  variant='container'
                  style={{ background: 'brown', color: 'white' }}
                  // onClick={() => navigate('./admin')}
                >
                  ADD ITEM
                </Button>
              </Link>
            </Card>

            {/* Menu for Edit and Delete */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedItemIndex === index}
              onClose={handleCloseMenu}
            >
              <Link to={`/edit/${index}`} style={{color:"black",textDecoration:'None'}}><MenuItem  >Edit</MenuItem></Link>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </div>
        ))}
      </div>
    </div>
  );
}
