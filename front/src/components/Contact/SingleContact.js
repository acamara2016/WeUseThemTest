import * as React from 'react';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

export default function SingleContact({email, firstName, image, lastName, phone_number, _id, handleRemoveContact}) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [share, setShare] = React.useState(false);
    const [to, setTo] = React.useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleShare = () => setShare(true);
    const handleCloseShare = () => setShare(false);
    const handleEditContact = (e) =>{
        e.preventDefault();
        navigate(`edit/${_id}`)
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        background: 'white',
        border: '2px solid #000',
        margin: '10px 0px 10px 0px',
        textAlign: 'center',
        borderRadius: 20,
        boxShadow: 24,
        p: 4,
    };
    const handleDeleteContact = () => {
      handleRemoveContact(_id);
      const userId = localStorage.getItem('userId');
        axios.delete(`http://localhost:8080/api/contact/delete/${userId}/${_id}`)
        .then(result=>{
            console.log(result);
            handleClose();
        })
        .catch(err=>{
            console.log(err);
        })
    }
  return (
    <>
    <Card id={_id} sx={{ minWidth: 275, margin: '10px 0px 10px 0px' }}>
      <CardContent>
          <Avatar alt={firstName+" "+lastName} src={'http://localhost:8080/'+image} />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {firstName} {lastName}<br/>
          Email: {email}<br/> Phone: {phone_number}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleEditContact} size="small">Edit</Button>
        <Button onClick={handleOpen} size="small">Delete</Button>
        <Button onClick={handleShare} size="small">Share</Button>
      </CardActions>
    </Card>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You are deleting a contact, click ok to confirm
          </Typography>
          <Button onClick={handleDeleteContact} size="small">Ok</Button>
          <Button onClick={handleClose} size="small">Cancel</Button>
        </div>
      </Modal>
    </>
     
  );
}