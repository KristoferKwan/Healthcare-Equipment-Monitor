import React from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from "google-maps-react";
import Hospital from "./Hospital";

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitals: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({
            hospitals: this.state.hospitals.concat(new Hospital("test", 42.02, -77.01))
        }), 3000);
    }

    onMarkerHover(props, marker, e) {
        console.log(props);
        if(props !== this.state.selectedPlace) {
            this.setState({
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true
            });
        }
    }


    render() {
        return (
            <Map google={this.props.google}>
                { this.state.hospitals.map(hospital =>
                        <Marker
                            key={hospital.name}
                            name={hospital.name}
                            position={hospital.position}
                            onMouseover={this.onMarkerHover.bind(this)}
                        />
                )}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "",
})(MapContainer);

