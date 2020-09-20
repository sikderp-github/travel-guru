import React, { useState } from 'react';
import Tour from '../Tours/Tour';
import fakeTours from '../../fakeData/fakeTours'

const Home = () => {
    const [sites] = useState(fakeTours);
    const siteStyle = {
        display: 'flex',
        margin: '40px',
        justifyContent: 'space-between'
    }
       
    return (
        <div style={siteStyle}>
            {
                sites.map(site => <Tour site={site} key={sites.placeId}></Tour>)
            }
        </div>
    );
};

export default Home;