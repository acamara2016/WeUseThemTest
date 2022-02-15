import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import {Container} from '@mui/material/';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const EditContact = ({userId}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const {id} = useParams();
    const [contact, setContact] = useState({});
 
    const fetchCurrentContact = (id) =>{
        axios.get(`http://localhost:8080/api/contact/${id}`)
        .then(result=>{
            setContact(result.data);
        })
    }
    useEffect(()=>{
         fetchCurrentContact(id);
    }, [])
    const handleSubmit = (event) => {
      event.preventDefault();
      setIsLoading(true);
      const data = new FormData(event.currentTarget);
      axios.put(`http://localhost:8080/api/contact/edit/${contact._id}`,{
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        phone_number: data.get('phone'),
        email: data.get('email'),
        image: file
      })
      .then((res)=>{
        setIsLoading(false);
        console.log(res);
        if(res.status){
          alert("Contact updated");
          setIsLoading(false);
        }else{
          alert("Failed to update contact");
          setIsLoading(false);
        }
      })
    };
  return (
      <Container>
        <Link to="/">BACK</Link>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <input
        margin="normal"
        required
        id="firstName"
        defaultValue={contact.firstName}
        name="firstName"
        autoFocus
        />
        <input
        margin="normal"
        required
        name="lastName"
        defaultValue={contact.lastName}
        id="lastName"
        />
        <input
        margin="normal"
        required
        name="phone"
        defaultValue={contact.phone_number}
        type="number"
        id="phone"
        />
        <input
        margin="normal"
        required
        name="email"
        type="email"
        defaultValue={contact.email}
        id="email"
        />
        <input
        margin="normal"
        required
        name="image"
        defaultValue={contact.image}
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        id="image"
        />
        
        {!isLoading && (<Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        >
        Update contact
        </Button>)}
        {isLoading && <p>Updating</p>}
    </Box>
      </Container>
 
 
  )
}

export default EditContact