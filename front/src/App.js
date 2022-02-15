import './App.css';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Dashboard from './pages/dashboard';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import SignIn from './pages/login';
import SignUp from './pages/register';
import EditContact from './components/Contact/EditContact';
function App() {
  const theme = createTheme();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [contacts, setContact] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  const fetchContacts = (userId) => {
      axios.get(`http://localhost:8080/api/users/${userId}`)
      .then(data=>{
          console.log(data);
          setContact(data.data);
      })
      .catch(err=>{
          alert(err);
      })
  };
  const addContact = (contact)=>{
    setContact([...contacts, contact]);
  }
  const removeContact =(id)=>{
    setContact(contacts.filter(c=> c._id!== id))
  }
  const handleSortAscending = () =>{
    const updateContact = [...contacts];
    updateContact.sort((a,b)=> a.firstName - b.firstName);
    setContact(updateContact);
  }
  const handleSortDescending = () =>{
    const updateContact = [...contacts];
    updateContact.sort((a,b)=> b.firstName - a.firstName);
    setContact(updateContact);
  }
  const handleLogout = () =>{
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/signin');
  }
 
  useEffect(()=>{
    if(!localStorage.getItem('userId')){
        navigate('signin');
    }else{
        setUserId(localStorage.getItem('userId'));
        fetchContacts(localStorage.getItem('userId'));
    }
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route 
          element={<Dashboard 
          handleAddingContact={addContact}
          handleRemoveContact={removeContact} 
          handleLogout={handleLogout}
          handleSortAscending={handleSortAscending}
          handleSortDescending={handleSortDescending}
          userId={userId} contacts={contacts}/>} 
          path="/" 
        />
        <Route element={<SignIn/>} path="/signin" />
        <Route element={<SignUp/>} path="/signup" />
        <Route element={<EditContact contact={selectedContact} userId={userId} />} path="/edit/:id" />
      </Routes>
    </ThemeProvider>
 
  );
}

export default App;
