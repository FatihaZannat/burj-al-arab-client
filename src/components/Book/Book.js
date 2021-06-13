import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userContext } from '../../App';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
import Booking from '../Booking';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [bookingDate, setBookingDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    })
    const handleCheckInDate = (date) => {
        const newDate ={...bookingDate}
        newDate.checkIn = date;
        setBookingDate(newDate)
    }
    const handleCheckOutDate = (date) =>{
        const newDate = {...bookingDate}
        newDate.checkOut = date;
        setBookingDate(newDate)
    }
    const handleBooking = () =>{
        const newBooking = {...loggedInUser, ...bookingDate}
        fetch('http://localhost:4000/addBooking', {
            method : 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(res => res.json)
        .then(data => {
            console.log(data);
        })
        
    }
    const {bedType} = useParams();
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Hello {loggedInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
            <KeyboardDatePicker    
            format="MM/dd/yyyy"
            value={bookingDate.checkIn} 
            onChange={handleCheckInDate}
           
            />
            <KeyboardDatePicker
             value={bookingDate.checkOut} 
             format="MM/dd/yyyy"
             onChange={handleCheckOutDate} 
           
             />  
             </Grid>      
            </MuiPickersUtilsProvider>          
            <Button onClick={handleBooking} variant="contained" color="primary">Book Now</Button>
            <Booking></Booking>
        </div>
    );
};

export default Book;