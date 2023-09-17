import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EnhancedTable from './EnhancedTable'; // Import the EnhancedTable component
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';




export default function Chefs() {
    
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
            {/* <Link to="/table">
            <Button
              color="inherit"
              style={{
                color: 'brown',
                backgroundColor: 'white',
                border: '1px solid brown',
                borderRadius: '999px', // Use a high value to create an oval shape
                padding: '4px 20px',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              sx={{ '&:hover': { backgroundColor: 'brown', color: 'white' } }}
            >
              Back
            </Button>
          </Link> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Chefs DashBoard
            </Typography>
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
            {/* <Link to="/table">
              <Button
                color="inherit"
                style={{
                  color: 'brown',
                  backgroundColor: 'white',
                  border: '1px solid brown',
                  borderRadius: '4px',
                  padding: '10px 20px',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                sx={{ '&:hover': { backgroundColor: 'brown', color: 'white' } }}
              >
                Menu
              </Button>
            </Link> */}
            
          </Toolbar>
          
        </AppBar>
      </Box>

      {/* Render the EnhancedTable component */}
      
      <EnhancedTable />
    </div>
  );
}
