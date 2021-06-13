import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../App';

const Booking = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [booking, setBooking] = useState([])

    useEffect(()=> {
        fetch('http://localhost:4000/booking?email='+loggedInUser.email , {
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'authorization' : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBooking(data))
    } , [])


    return (
        <div>
            <h3>you have: {booking.length} bookings</h3>
            {
                booking.map(book => <li>{book.name} from;{new Date(book.checkIn).toDateString('dd/mm/yyyy')} to:{new Date(book.checkOut).toDateString('dd/mm/yyyy')}</li>)
            }
        </div>
    );
};

export default Booking;