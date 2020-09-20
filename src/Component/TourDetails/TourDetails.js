import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeHotels from '../../fakeData/fakeHotels';
import star_1 from '../../Images/Icon/star_1.png'
import './TourDetails.css'

const TourDetails = () => {
    const [hotels] = useState(fakeHotels);
    const { title } = useParams();
    const imgStyle = {
        width: '220px',
        margin: '10px',
        padding: '5px'
    }
    const logoStyle = {
        width: '15px',
        padding: '5px'
    }
    return (
        <div className="TourDetails-container">
            <hr />
            <p>252 stays September 15-20 10 guests</p>
            <h1>STAY IN {title} </h1> <br />
            {
                hotels.map(hotel => <div className="hotel-container">
                    <div>
                        <img style={imgStyle} src={hotel.photoUrl} alt="" />
                    </div>
                    <div style={{ margin: '10px', alignItems: 'center' }}>
                        <h3>{hotel.title}</h3>
                        <h4>{hotel.capacity}</h4> <br />
                        <h4>{hotel.facility}</h4>
                        <h4>{hotel.flexibility}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <img style={logoStyle} src={star_1} alt="" />
                            <p>{hotel.rating}</p>
                            <br />
                            <p>{hotel.price}</p>
                        </div>
                    </div>

                </div>)
            }
        </div>
    );
};

export default TourDetails;