import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './Booking.css';

const Booking = () => {
    const { title } = useParams();
    const history = useHistory()
    const handleHotelBook = () => {
        history.push(`/hotels/${title}`);
    }
    return (
        <div className="booking" >
            <form onSubmit={handleHotelBook} className="booking-form">
                <h1>Booking</h1>
                <label>Origin</label> <br />
                <input type="text" name="from" placeholder="From where" id="" required /><br />
                <label>Destination</label> <br />

                <input type="text" name="To" placeholder="Where to" id="" required /> <br />
                <div>
                    <label>From</label> <br />
                    <input type="date" name="" id="fromDate" required />
                </div><br />
                <div>
                    <label>To</label><br />
                    <input type="date" name="" id="toDate" required /><br />
                </div><br />
                <br />
                <button type="submit" >Start Booking</button>
            </form>
        </div>
    );
};

export default Booking;