import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';

const AddContact = ({userId, handleAddingContact}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      setIsLoading(true);
      const data = new FormData();
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("phone_number", phone);
      data.append("email", email);
      data.append("userId", userId);
      data.append("file", file);
      console.log(data);
      axios.post('http://localhost:8080/api/contact/add', data)
      .then((res)=>{
        setIsLoading(false);
        console.log(res);
        if(res.status){
            handleAddingContact(res.data);
          alert("New contact added");
          setIsLoading(false);
        }else{
          alert("Failed to add contact");
          setIsLoading(false);
        }
      })
    };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
    <TextField
      margin="normal"
      required
      fullWidth
      id="firstName"
      onChange={event=>{setFirstName(event.target.value)}}
      label="First Name"
      name="firstName"
      autoFocus
    />
    <TextField
      margin="normal"
      required
      fullWidth
      onChange={event=>{setLastName(event.target.value)}}
      name="lastName"
      label="Last Name"
      id="lastName"
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="phone"
      onChange={event=>{setPhone(event.target.value)}}
      type="number"
      label="Phone"
      id="phone"
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="email"
      onChange={event=>{setEmail(event.target.value)}}
      type="email"
      label="Email"
      id="email"
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="image"
      onChange={(e) => setFile(e.target.files[0])}
      type="file"
      id="file"
    />
    
    {!isLoading && (<Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Add contact
    </Button>)}
    {isLoading && <p>Authenticating</p>}
  </Box>
 
  )
}

export default AddContact