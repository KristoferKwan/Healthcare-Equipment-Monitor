import React from "react";
import {
  GoogleApiWrapper,
  InfoWindow,
  Map,
  Marker,
} from "google-maps-react";
import Hospital from "./Hospital";
import Axios from "axios";

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitals: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  componentDidMount() {
    // setTimeout(
    //   () =>
    //     this.setState({
    //       hospitals: this.state.hospitals
    //           .concat(new Hospital("location1", "test", 42.02, -77.01))
    //           .concat(new Hospital("location2", "Example Hospital", 41.00, -77.01))
    //     }),
    //   3000
    // );

    Axios.get("/hospitals")
        .then(response => {
          this.setState({
            hospitals: response.data.map(hospital =>
                new Hospital(
                    hospital._id,
                    hospital.name,
                    hospital.location.latitude,
                    hospital.location.longitude
                )
            )
          })
        }, error => {
          window.alert("Unable to load hospital locations. Please try again.")
          console.log(error);
        })
  }

  onMarkerHover(props, marker, e) {
    if (!this.state.showingInfoWindow) {
      if (props !== this.state.selectedPlace) {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
      }
    }
  }

  onMarkerHoverOut(props, marker, e) {
    if (props !== this.state.selectedPlace) {
      this.setState({
        selectedPlace: {},
        activeMarker: {},
        showingInfoWindow: false
      });
    }
  }

  onMarkerClick(props, marker, e) {
    // https://github.com/fullstackreact/google-maps-react/issues/202
    window.location =  window.location.origin.toString() + "/info/" + props.id;
  }

  render() {
    return (
      <Map
          google={this.props.google}
          initialCenter={{
            lat: 42.02,
            lng: -77.01
          }}
      >
        {this.state.hospitals.map(hospital => (
          <Marker
            key={hospital.id}
            id={hospital.id}
            title={hospital.name}
            position={hospital.position}
            onMouseover={this.onMarkerHover.bind(this)}
            onMouseout={this.onMarkerHoverOut.bind(this)}
            onClick={this.onMarkerClick.bind(this)}
          />
        ))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.title}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCxEJO9cFv1Hm6-l65Wwf3xTehfYOUC5vs"
})(MapContainer);
