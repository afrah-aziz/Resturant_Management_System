import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
// import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from 'react-router-dom';




export default function EnhancedTable() {
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  const fetchDeletedItemsFromLocalStorage = () => {
    const deletedItemsLocalStorageKey = 'deletedOrders';
    const deletedItemsFromLocalStorage = JSON.parse(
      localStorage.getItem(deletedItemsLocalStorageKey) || '[]'
    );

    // Update the rows state with deleted items
    setRows(deletedItemsFromLocalStorage);
  };

  React.useEffect(() => {
    fetchDeletedItemsFromLocalStorage(); // Call this to retrieve deleted items
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  // ...

  const handleDelete = () => {
    const updatedRows = rows.filter((row) => !selected.includes(row.name));
    const deletedItems = rows.filter((row) => selected.includes(row.name));
  
    // Remove the deleted items from the 'deletedOrders' key in local storage
    const deletedItemsLocalStorageKey = 'deletedOrders';
    const deletedItemsFromLocalStorage = JSON.parse(
      localStorage.getItem(deletedItemsLocalStorageKey) || '[]'
    );
  
    const updatedDeletedItems = deletedItemsFromLocalStorage.filter(
      (item) => !selected.includes(item.name)
    );
  
    localStorage.setItem(deletedItemsLocalStorageKey, JSON.stringify(updatedDeletedItems));
  
    setRows(updatedRows);
    setSelected([]);
  };
  

// ...


  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;



  const navigate = useNavigate();


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
              Prepared Items
            </Typography>
            
            {/* Use the navigate function to navigate to "/table" */}
            <Button
              color="inherit"
              style={{
                color: 'brown',
                backgroundColor: 'white',
                border: '1px solid brown',
                borderRadius: '999px',
                padding: '6px 20px',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              sx={{ '&:hover': { backgroundColor: 'brown', color: 'white' } }}
              onClick={() => navigate('/table')}
            >
              View Order
            </Button>

            {/* Use the navigate function to navigate to "/" (home) */}
            <Button
              color="inherit"
              style={{
                color: 'brown',
                backgroundColor: 'white',
                border: '1px solid brown',
                margin:'0px 0 0 20px',
                borderRadius: '999px',
                padding: '6px 20px',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              sx={{ '&:hover': { backgroundColor: 'brown', color: 'white' } }}
              onClick={() => navigate('/')}
            >
              LogOut
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      


    <Box sx={{ width: '100% '  }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={
                      selected.length === rows.length && rows.length > 0
                    }
                    onChange={handleSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
                <TableCell>Dishes</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${row.name}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.totalPrice}</TableCell>
                    <TableCell align="right">{row.totalBill}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <IconButton
        aria-label="delete"
        onClick={handleDelete}
        disabled={selected.length === 0}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
    </div>
  );
}
