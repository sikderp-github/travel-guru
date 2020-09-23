import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import './GoogleMaps.css'

export class MapContainer extends Component {
    render() {
        const style = {
            width: '40%',
            height: '98%',
            border: '2px solid orange',
            borderRadius: '10px',
            boxShadow: '2px 3px'
        }
        return (
            <containter className="googleMap">
                <Map google={this.props.google}
                    style={style}
                    initialCenter={{
                        lat: 22.330370,
                        lng: 91.832626
                    }}
                    zoom={15}
                // onClick={this.onMapClicked}
                >

                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>Location</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </containter>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDxuZ9Xhslyh821Sm4Qh6XflJRkl_SBw9I")
})(MapContainer)


// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyDxuZ9Xhslyh821Sm4Qh6XflJRkl_SBw9I")
// })(GoogleMaps)