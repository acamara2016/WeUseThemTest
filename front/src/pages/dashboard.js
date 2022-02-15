import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import SingleContact from '../components/Contact/SingleContact';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Search, SearchIconWrapper, StyledInputBase} from '../components/AppBar';
import AddContact from '../components/Contact/AddContact';

const Dashboard = ({contacts, userId, handleContactEdit, handleAddingContact, handleRemoveContact, handleLogout, handleSortAscending,handleSortDescending }) => {
    const [value, setValue] = React.useState('1');
    const [query, setQuery] = React.useState('');
 
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleSearchInput = (event) =>{
        setQuery(event.target.value);
    }
 
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Contact Book
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={handleSearchInput}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All contacts" value="1" />
            <Tab label="Add contact" value="2" />
            <Tab label="Account" value="3" />
            </TabList>
        </Box>
        <Button onClick={handleSortAscending} >Sort Alpha (ASD)</Button>
        <Button  onClick={handleSortDescending}>Sort Alpha (DESC)</Button>
        <TabPanel value="1">
            {contacts.filter((contact)=> {
                if(query===""){
                    return contact;
                }else if((contact.firstName.toLowerCase()+" "+contact.lastName.toLowerCase()).includes(query.toLowerCase())){
                    return contact;
                }else if(contact.email.toLowerCase().includes(query.toLowerCase())){
                    return contact;
                }else if(contact.phone_number===query){
                    return contact;
                } 
            }).map(contact=>{
            return (<SingleContact 
                key={contact._id}
                firstName={contact.firstName} 
                lastName={contact.lastName}
                phone_number={contact.phone_number}
                image={contact.image}
                email={contact.email}
                handleRemoveContact={handleRemoveContact}
                editContact={handleContactEdit}
                _id={contact._id}
                />)
            })}
        </TabPanel>
        <TabPanel value="2"><AddContact handleAddingContact={handleAddingContact} userId={userId}/></TabPanel>
        <TabPanel value="3">
            <Button onClick={handleLogout}>Logout</Button>
        </TabPanel>
        </TabContext>
    </Box>
  )
}


export default Dashboard